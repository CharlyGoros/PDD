export const Role = {
  GUEST: 0,
  ADMIN: 1,
};

export class User {
  constructor({ _id, name, lastName, email, age, role }) {
    this._id = _id;
    this.name = name;
    this.lastName = lastName;
    this.email = email;
    this.age = age;
    if (!Object.values(Role).includes(role)) {
      throw new Error(`Invalid role: ${role}`);
    }
    this.role = role;
  }

  toJSON() {
    return {
      _id: this._id,
      name: this.name,
      lastName: this.lastName,
      email: this.email,
      age: this.age,
      role: this.role,
    };
  }
}

export class ArtWork {
  constructor({ _id, title, description, images }) {
    this._id = _id;
    this.title = title;
    this.description = description;
    this.images = images;
  }

  toJSON() {
    return {
      _id: this._id,
      title: this.title,
      description: this.description,
      images: this.images,
    };
  }
}

export class Category {
  constructor({ _id, title, description, image, artWorks }) {
    this._id = _id;
    this.title = title;
    this.description = description;
    this.image = image;
    this.artWorks = Array.isArray(artWorks)
      ? artWorks.map(artWork => new ArtWork(artWork))
      : [];
  }

  toJSON() {
    return {
      _id: this._id,
      title: this.title,
      description: this.description,
      image: this.image,
      artWorks: this.artWorks.map(artWork => artWork.toJSON()),
    };
  }
}