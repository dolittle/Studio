# MongoDB

The microservices in this repository leverages MongoDB for storage.
MongoDB is a document oriented database with rich query capabilities and is
very well suited for storing non-relational data. With [event sourcing](./event-sourcing.md)
at play, there is no need for relational models and makes a document
approach even more suitable. With the aid of [projections](./projections.md)
you should find it fairly effortless introducing new document shapes
for whatever types you want.

You can read more about the database [here](https://www.mongodb.com).

## Tools

With a rich ecosystem, there are quite a few tools available for MongoDB.
As a client tool, you could be using the official tool from MongoDB called
Compass - which can be found [here](https://www.mongodb.com/products/compass).

If you're looking for something more of an integrated experience into VScode,
there are several extensions and also an official one from MongoDB that
can be found [here](https://marketplace.visualstudio.com/items?itemName=mongodb.mongodb-vscode).
