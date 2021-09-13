<p align="center">
  <h2 align="center">REST API for plug.lk</h3>

  <p align="center">
    A RESTful API for an online marketplace.
    <br />
    <br />
    <a href="https://plug-api.herokuapp.com/">View Demo</a>
    ·
    <a href="https://github.com/Thusara-Senanayake/plug.lk-api/issues">Report Bug</a>
    ·
    <a href="https://github.com/Thusara-Senanayake/plug.lk-api/issues">Request Feature</a>
  </p>
</p>

## About The Project

API is an interface for another service that can be used programmatically. Building an API with REST architectural style adds greater flexibility, scalability, portability and much more perks. This simple API was developed for an imaginary online marketplace, with the help of **MongoDB**, **Express**, **Node.js**. Currently avalilable endpoints are mentioned in the **Endpoints** section. Some of them are authenticated with JSON Web Token.

<br />

<p align="center">

![database design][schema]

</p>
A list of commonly used resources that I find helpful are listed in the acknowledgements.

## Built With

- [Express](https://expressjs.com/)
- [Mongo DB Atlas](https://www.mongodb.com/cloud/atlas)

## Endpoints

> GET https://plug-api.herokuapp.com

### Sellers

> POST https://plug-api.herokuapp.com/sellers

```json
Content-Type: application/json
Authorization: Bearer <token>

{
"name":"sellers name",
"address":{"addressLine1":"12","addressLine2":"Street"},
"phone":"0111111111",
"email":"test@test.com",
"images":["img1","img2"],
"password":"123123"
}
```

> GET https://plug-api.herokuapp.com/sellers

```json
Authorization: Bearer <!! Admin's token>
```

> GET https://plug-api.herokuapp.com/sellers/<id\>

```json
Authorization: Bearer <token>
```

> POST https://plug-api.herokuapp.com/sellers/login

```json
Content-Type: application/json

{
"email":"test@test.com",
"password":"123123"
}
```

> DELETE https://plug-api.herokuapp.com/sellers/<id\>

```json
Authorization: Bearer <token>
```

> PUT https://plug-api.herokuapp.com/sellers/<id\>

```json
Content-Type: application/json
Authorization: Bearer <token>

{
"name":"seller new name"
}
```

### Products

> GET https://plug-api.herokuapp.com/products

> GET https://plug-api.herokuapp.com/products/<id\>

> GET https://plug-api.herokuapp.com/products?q=<search term\>

> POST https://plug-api.herokuapp.com/products

```json
Content-Type: application/json
Authorization: Bearer <token>

{
"name":"product name",
"description":"product description",
"address":{"addressLine1":"12","addressLine2":"Street"},
"phone":"0111111111",
"condition":"New",
"images":["img1","img2"],
"sellerInfo":"<valid seller's ObjectId>"
}
```

> DELETE https://plug-api.herokuapp.com/products/<id\>

```json
Authorization: Bearer <token>
```

> PUT https://plug-api.herokuapp.com/products/<id\>

```json
Content-Type: application/json
Authorization: Bearer <token>

{
"name":"product new name"
}
```

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running, open your terminal in a favoured location and follow these simple example steps. (Assuming you've installed node.js and git on your os)

```sh

git clone https://github.com/Thusara-Senanayake/plug.lk-api.git plug.lk-api
cd plug.lk-api
npm install
```

After successful installation, configure these settings related with **.env.example** file.

```
- Rename .env.example to .env
- Replace <fields> with relevant values.

  example

    MONGODB_URI=mongodb+srv://name:<password>@cluster0.wszwp.mongodb.net/test
    HOST_NAME=localhost:5000

```

And then run the project by

```sh
npm start
```

You need to create a user before creating products.

## Roadmap

See the [open issues](https://github.com/Thusara-Senanayake/plug.lk-api/issues) for a list of proposed features (and known issues).

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTACT -->

## Contact

Project Link: [plug.lk-api](https://github.com/Thusara-Senanayake/plug.lk-api)

<!-- ACKNOWLEDGEMENTS -->

## Acknowledgements

- [JSend](https://github.com/omniti-labs/jsend)
- [Faker](https://www.npmjs.com/package/faker)
- [Choose an Open Source License](https://choosealicense.com)

[schema]: /public/assets/img/schema.png
