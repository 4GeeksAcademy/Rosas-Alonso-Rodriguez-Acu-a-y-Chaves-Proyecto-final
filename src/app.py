"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from sqlalchemy.exc import IntegrityError
from flask_migrate import Migrate
from flask_swagger import swagger
from api.utils import APIException, generate_sitemap 
from api.models import db
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from api.models import db, User, Pet, Post_Description, Breed, Genders, PetStatus
from flask_cors import CORS 

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt

ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../public/')

app = Flask(__name__)
app.url_map.strict_slashes = False
CORS(app, origins = "*")
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_KEY")
jwt = JWTManager(app)
bcrypt = Bcrypt(app)


# database condiguration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace(
        "postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)

# add the admin
setup_admin(app)

# add the admin
setup_commands(app)

# Add all endpoints form the API with a "api" prefix
app.register_blueprint(api, url_prefix='/api')

# Handle/serialize errors like a JSON object


@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# generate sitemap with all your endpoints

@app.route('/api/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

#Traer usuarios
@app.route('/api/users', methods=['GET'])
def get_users():
    users = User.query.all()
    users_serialized = []
    for user in users:
        users_serialized.append(user.serialize())
    return jsonify({'msg': 'ok', 'usuarios: ': users_serialized}),200

#Traer solo un usuario (autenticado)   -14/12 Flor (para navbar>editar perfil)
@app.route('/api/logged_user', methods=['GET'])
@jwt_required()
def get_profile():
    current_user = get_jwt_identity()
    user = User.query.filter_by(email=current_user).first()  #busco al usuario por su email en la base de datos

    if not user:
        return jsonify({'msg': 'Usuario no encontrado'}), 404
    
    return jsonify({'msg': 'ok', 'usuario': user.serialize()}), 200
#Lo comento porque esto capaz se hace en Editar perfil


# Post: nuevo usuario
@app.route('/api/user', methods=['POST'])
def create_user():
    body = request.get_json(silent=True)
    if body is None:
        return jsonify({'msg': 'El cuerpo de la solicitud está vacío'}), 400
    if 'name' not in body or not body['name'].strip(): 
        return jsonify({'msg': "El campo 'name' es obligatorio"}), 400
    if 'email' not in body or not body['email'].strip(): 
        return jsonify({'msg': "El campo 'email' es obligatorio"}), 400
    if 'password' not in body or not body['password'].strip():
        return jsonify({'msg': "El campo 'password' es obligatorio"}), 400
    if 'security_question' not in body or not body['security_question'].strip():
        return jsonify({"msg": "El campo 'security_question' es obligatorio"}), 400
    if 'phone' not in body or not body['phone'].strip():  #si no existe teléfono o es vacío o es un espacio
        return jsonify({'msg': "El campo 'phone' es obligatorio"}), 400

    try:
        new_user = User(
            name = body['name'],
            email = body['email'],
            password= bcrypt.generate_password_hash(body['password']).decode('utf-8'),
            is_active=True,
            security_question=body['security_question'],
            phone=body['phone'],  
            facebook=body.get('facebook', None),  # Obtener si existe o asignar None
            instagram=body.get('instagram', None),  # Obtener si existe o asignar None
        )

        db.session.add(new_user)
        db.session.commit()
        return jsonify({'msg':'Usuario creado exitosamente', 'data': new_user.serialize()}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'msg': f'Error al crear el usuario: {str(e)}'}), 500

#LOGIN: 
@app.route('/api/login', methods=['POST'])
def login():
    body = request.get_json(silent=True)
    if body is None:
        return jsonify({'msg': 'Debes enviar informacion '}), 400
    if 'email'  not in body:
        return jsonify({'msg': 'El campo email es obligatorio'}), 400
    if 'password' not in body:
        return jsonify({'msg': 'El campo password es obligatorio'}), 400
    user = User.query.filter_by(email=body['email']).first()
    if user is None:

        return jsonify({'msg': "invalid email or password"}), 400 #CAMBIAR por email or password is invalid
    crypted_password = bcrypt.check_password_hash(user.password, body['password'])
    if not crypted_password:
        return jsonify({'msg': "invalid email or password"}), 400 #CAMBIAR por email or password is invalid
    access_token = create_access_token(identity=user.email) 
    return jsonify({'msg': 'ok', 'token': access_token}), 200 

#Update password
@app.route('/api/user/<int:id>', methods=['PUT'])
def update_password(id):
    body= request.get_json(silent=True)
    if body is None:
        return jsonify({'msg': 'Debes enviar informacion '}), 400
    if 'security_question' not in body:
        return jsonify({'msg': 'Debes enviar el campo "security_question" y su respuesta'}), 400
    if 'new_password' not in body:
        return jsonify({'msg': "El campo 'new_password' es obligatorio"}), 400 #Hasta ahora no hay limite de caracteres ni requerimientos especiales para la password
    user = User.query.filter_by(security_question=body['security_question']).first()
    if user.security_question != body['security_question']:
        return jsonify({'msg': 'Respuesta incorrecta a la security question'}),400
    user = User.query.get(id)
    user.password = body['new_password']
    db.session.commit()
    return jsonify({'msg': 'la contraseña ha sido cambiada exitosamente'})

#editar user según id   -Flor 16/12
@app.route('/api/update_user/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    data = request.get_json()

    user = User.query.get(user_id)

    if not user:
        return jsonify({"msg": "Usuario no encontrado"}), 404

    user.name = data.get('name', user.name)
    user.email = data.get('email', user.email)
    user.phone = data.get('phone', user.phone)
    user.facebook = data.get('facebook', user.facebook)
    user.instagram = data.get('instagram', user.instagram)
    user.is_active = data.get('is_active', user.is_active)

    db.session.commit()

    return jsonify({
        "msg": "Usuario actualizado correctamente",
        "user": user.serialize()
    })


#Private access
@app.route('/api/private', methods=['GET'])
@jwt_required()
def private():
    current_user = get_jwt_identity()
    print('Este es el usuario que esta haciendo la peticion: ', current_user)
    if current_user:
        return jsonify({'msg': 'Bienvenido', 'Este es el usuario que esta haciendo la peticion: ': current_user})
    return jsonify({'msg': 'Acceso denegado'}), 400
###############################

#PET
#Creación de nueva mascota:
@app.route('/api/create_pet', methods=['POST'])
@jwt_required()
def create_pet():
    try:
        jwt_email = get_jwt_identity()
        user = User.query.filter_by(email=jwt_email).first()
        
        body = request.get_json(silent=True)
        print(body)
        if body is None: 
            return jsonify({'msg': 'El cuerpo de la solicitud está vacío'}), 400

        required_fields = ["name", "breed", "gender", "photo_1"]
        for field in required_fields:
            if field not in body:
                return jsonify({'msg': f"El campo {field} es obligatorio"}), 400

        breed_name = body.get('breed')
        species = body.get('species')
        breed = Breed.query.filter_by(name=breed_name, species=species).first()
        if not breed:
            breed = Breed(name=breed_name, species=species)
            db.session.add(breed)
            db.session.flush()

        new_pet = Pet(
            name = body['name'],
            breed = breed.id,
            gender= body['gender'],
            color=body['color'],
            photo_1=body['photo_1'],
            photo_2=body.get ('photo_2'),
            photo_3=body.get ('photo_3'),
            photo_4=body.get ('photo_4'),
            user_id = user.id,
        )
        db.session.add(new_pet)
        db.session.flush()

        post_description = Post_Description(
            pet_id = new_pet.id,
            longitude = body['longitude'],
            latitude = body['latitude'],
            description = body['description'],
            zone = body['zone'],
            event_date = body['event_date'],
            pet_status = PetStatus[body['pet_status']]
        )
        db.session.add(post_description)
        db.session.commit()
        
        return jsonify({
            "msg": "Mascota, raza y post creados exitosamente",
            "data": {
                "post_description":post_description.serialize()
                }
                }), 201
    except IntegrityError:
        db.session.rollback()
        return jsonify({'msg':'Error', 'data': 'Posibles entradas duplicadas'}), 400
    except Exception as e:
        print(e)
        db.session.rollback()
        return jsonify({'msg':'Error', 'data': str(e)}), 500


#Editar mascota:
@app.route('/api/pet/<int:id>', methods=['PUT'])
#@jwt_required()  para q sea accesible solo si el usuario tiene un token válido?
def edit_pet(id):
    body = request.get_json(silent=True)
    if body is None:
        return jsonify({'msg': 'El cuerpo de la solicitud está vacío'}), 400
    pet = Pet.query.get(id) #
    if not pet:
        return jsonify({'msg': 'Mascota no encontrada'}), 404


      # Accedo a la relación 'post' para obtener la post_description    -Flor 16/12

    post_description = Post_Description.query.filter_by(pet_id=id).first()
    
    if not post_description:
        return jsonify({'msg': 'No se encontró la publicación asociada a la mascota'}), 404
    
    if 'pet_status' in body:
        post_description.pet_status = body['pet_status']  # esto actualiza el status de la mascota


    if 'name' in body:
        pet.name = body['name']
    if 'breed' in body:
        pet.breed = body['breed']
    if 'gender' in body:
        pet.gender = body['gender']
    if 'color' in body:
        pet.color = body['color']
    if 'photo_1' in body:
        pet.photo_1 = body['photo_1']
    if 'photo_2' in body:
        pet.photo_2 = body['photo_2']
    if 'photo_3' in body:
        pet.photo_3 = body['photo_3']
    if 'photo_4' in body:
        pet.photo_4 = body['photo_4']
    
    db.session.commit()
    return jsonify({'msg': 'Mascota actualizada exitosamente', 'data': pet.serialize()}), 201

#endpoint para traer mascota según su id   -Flor 16/12
@app.route('/api/pet/<int:id>', methods=['GET'])
def get_pet_by_id(id):
    pet = Pet.query.get(id)
    if not pet:
        return jsonify({'msg': 'Mascota no encontrada'}), 404

    # Buscamos la publicación asociada a ese id de mascota
    post_description = Post_Description.query.filter_by(pet_id=id).first()
    if not post_description:
        return jsonify({'msg': 'No se encontró la publicación asociada a la mascota'}), 404
    species_map = {
        "1": "Perro",
        "2": "Gato",
        "3": "Ave",
        "4": "Conejo",
        "5": "Reptil",
        "6": "Otro"
    }

    species_value = pet.breed_relationship.species.value if pet.breed_relationship and pet.breed_relationship.species else None
    species_description = species_map.get(species_value, "Desconocido")

    pet_data = {
        "pet_id": pet.id,
        "name": pet.name,
        "breed": pet.breed_relationship.name if pet.breed_relationship else None,
        "species": species_description,
        "gender": pet.gender.value if pet.gender else None,
        "color": pet.color,
        "photo_1": pet.photo_1,
        "photo_2": pet.photo_2,
        "photo_3": pet.photo_3,
        "photo_4": pet.photo_4,
        "user_id": pet.user_id,
        "user_details": {
            "id": pet.user.id,
            "email": pet.user.email,
            "phone": pet.user.phone,
            "facebook": pet.user.facebook,
            "instagram": pet.user.instagram
        } if pet.user else None,
        "pet_status": post_description.pet_status.value,
        "latitude": post_description.latitude,
        "longitude": post_description.longitude,
        "description": post_description.description,
        "zone": post_description.zone,  # Zona de la mascota
        "event_date": post_description.event_date  # Fecha del evento
    }

    return jsonify({'msg': 'ok', 'data': pet_data}), 200

#Eliminar mascota:
@app.route('/api/pet/<int:id>', methods=['DELETE'])
#@jwt_required()  para q sea accesible solo si el usuario tiene un token válido?
def delete_pet(id):
    pet = Pet.query.get(id)
    if not pet:
        return jsonify({'msg': 'Mascota no encontrada'}), 404
    
    for post in pet.post: #esto elimina los posts relacionados a esa mascota
        db.session.delete(post)
    
    db.session.delete(pet)
    db.session.commit()
    return jsonify({'msg': 'Mascota eliminada exitosamente'}), 201
##########

#Creación de un nuevo post con la descripción de la mascota:
@app.route('/api/post_description', methods=['POST'])
def create_post_description():
    body = request.get_json(silent=True)
    if body is None: 
        return jsonify({'msg': 'El cuerpo de la solicitud está vacío'}), 400
    if 'pet_id' not in body: 
        return jsonify({'msg': "El campo 'pet_id' es obligatorio"}), 400
    ##latitud y longitud quedan definidas al hacer clic en el mapa?
    if 'longitude' not in body: 
        return jsonify({'msg': "El campo 'longitude' es obligatorio"}), 400
    if 'latitude' not in body:
        return jsonify({'msg': "El campo 'latitude' es obligatorio"}), 400
    if 'description' not in body: 
        return jsonify({'msg': "El campo 'description' es obligatorio"}), 400
    if 'zone' not in body: 
        return jsonify({'msg': "El campo 'zone' es obligatorio"}), 400
    if 'event_date' not in body: 
        return jsonify({'msg': "El campo 'event_date' es obligatorio"}), 400
    if 'pet_status' not in body: 
        return jsonify({'msg': "El campo 'pet_status' es obligatorio"}), 400

    #verificación de la existencia de la mascota en la base de datos:
    pet = Pet.query.get(body['pet_id'])
    if not pet:
        return jsonify({'msg': "Mascota no encontrada con ese ID"}), 404

    #new post:
    new_post = Post_Description(
        pet_id = body['pet_id'],
        longitude = body['longitude'],
        latitude = body['latitude'],
        description = body['description'],
        zone = body['zone'],
        event_date = body['event_date'],
        pet_status = body['pet_status']
    )
    db.session.add(new_post)
    db.session.commit()
    return jsonify({'msg':'Post creado exitosamente', 'data': new_post.serialize()}), 201
#######

#GET All pets Matias 17:46PM 3/12/24..Update: working 11:43AM 4/12/24
@app.route('/api/pets', methods=['GET'])
def get_all_pets():
    pets = Pet.query.all()
    pets_serialized = []
    for pet in pets:
       pets_serialized.append(pet.serialize())
    return jsonify({'msg': 'ok', 'data': pets_serialized}), 200

#endpoint para obtener la info de los posts, para usarla en el mapa.   -Flor
@app.route('/api/pet_post', methods=['GET'])
def get_pet_post():
    species_map = {
        "1": "Perro",
        "2": "Gato",
        "3": "Ave",
        "4": "Conejo",
        "5": "Reptil",
        "6": "Otro"
    }
    posts = Post_Description.query.all()  
    pet_data = []
    for post in posts:
        pet = post.pet_relationship  # Relación con la mascota (Pet)
        user = pet.user
        print("aca esta el objeto 'pet': ", pet.serialize())
        species_value = pet.breed_relationship.species.value if pet.breed_relationship and pet.breed_relationship.species else None
        species_description = species_map.get(species_value,"Desconocido")
        pet_data.append({
            "pet_id": pet.id,
            "name": pet.name,
            "breed": pet.breed_relationship.name if pet.breed_relationship else None,
            "species": species_description,  # Se agrego especie
            "gender": pet.gender.value if pet.gender else None,  # Se agrego género
            "color": pet.color,
            "photo_1": pet.photo_1,
            "photo_2": pet.photo_2,
            "photo_3": pet.photo_3,
            "photo_4": pet.photo_4,
            "user_id": pet.user_id,
            "user_details": {
                "id": user.id,
                "email": user.email,
                "phone": user.phone,
                "facebook": user.facebook,
                "instagram": user.instagram
            } if user else None, #Modificado
            "pet_status": post.pet_status.value,  # El estado de la mascota desde Post_Description
            "latitude": post.latitude,
            "longitude": post.longitude,
            "description": post.description
        })

    return jsonify({'msg': 'ok', 'data': pet_data}), 200

#TRAER MASCOTA EN PARTICULAR MATIAS 12/15/2024 FUNCIONA
@app.route('/api/pet/<int:id>', methods=['GET'])
def get_pet(id):
    post = Post_Description.query.filter_by(pet_id=id).first()
    if not post:
        return jsonify({'msg': 'Mascota no encontrada'}), 404
    
    # pet = post.pet_relationship  # Relación con la tabla Pet
    # if not pet:
    #     return jsonify({'msg': 'Mascota asociada no encontrada'}), 404
    return jsonify({'msg': 'Mascota traída exitosamente', 'data': post.serialize()}), 200

###################
# any other endpoint will try to serve it like a static file
@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # avoid cache memory
    return response


# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)