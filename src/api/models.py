from flask_sqlalchemy import SQLAlchemy
from enum import Enum


db = SQLAlchemy()

class User(db.Model):
    __tablename__ = "user"
    id = db.Column(db.Integer, primary_key=True)
    name=db.Column(db.String(120),nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    phone = db.Column (db.Integer)
    facebook = db.Column (db.String(120))
    instagram = db.Column (db.String(120))
    security_question= db.Column(db.String(120), nullable=True)
    pet = db.relationship ("Pet", back_populates ="user")

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "phone": self.phone,
            "facebook" : self.facebook,
            "instagram" : self.instagram
        }
class PetStatus(Enum):
    lost = "Estoy perdido"
    find = "Busco a mi familia"
    joined = "Encontrado"    

class Genders (Enum):
    male = "macho"
    female = "hembra"

class Pet(db.Model):
    __tablename__ ="pet"
    id = db.Column (db.Integer, primary_key=True)
    name = db.Column (db.String(30))
    species = db.Column (db.String(15), nullable=False)
    breed = db.Column (db.String (15))
    gender = db.Column (db.Enum(Genders))
    color = db.Column (db.String(15))
    photo_1 = db.Column (db.String(120), nullable=False)
    photo_2 = db.Column (db.String(120))
    photo_3 = db.Column (db.String(120))
    photo_4 = db.Column (db.String(120))
    user_id = db.Column (db.Integer, db.ForeignKey("user.id"))
    user = db.relationship ("User", back_populates="pet")
    post = db.relationship("Post_Description", back_populates="pet_relationship")

    def __repr__(self):
        return f'<Pet {self.name, self.species, self.color, self.user}>'

    def serialize(self):
        return{
            "name" : self.name,
            "species" : self.species,
            "breed" : self.breed,
            "color": self.color,
            "photo_1": self.photo_1,
            "photo_2" : self.photo_2,
            "photo_3": self.photo_3,
            "photo_4" : self.photo_4,
            "user_id" : self.user_id    
        }

class Post_Description (db.Model):
    __tablename__ = "post_description"
    id = db.Column(db.Integer, primary_key = True)
    pet_id = db.Column(db.Integer, db.ForeignKey("pet.id"))
    pet_relationship = db.relationship("Pet", back_populates="post")
    longitude = db.Column(db.Float)
    latitude = db.Column(db.Float)
    description = db.Column (db.Text)
    zone = db.Column (db.String(30), nullable= False)
    event_date = db.Column (db.Date)
    pet_status = db.Column(db.Enum(PetStatus), nullable=False)
    
    def __repr__(self):
            return f'<Pet {self.pet_id, self.zone, self.pet_status}>'

    def serialize(self):
            return{    
                "pet_info": self.pet_id,
                "longitude" : self.longitude,
                "latitude": self.latitude,
                "description" : self.description,
                "event_date" : self.event_date,
                "pet_status" : self.pet_status
            }