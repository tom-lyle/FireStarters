# Data Structure
First priority is standing up a database - we need to first have a schema for each thing we want to track/store. Some immediate first ideas: 

- [Event](https://schema.org/Event)
- [Church](https://schema.org/Church)

These will give us a starting point for the data structure.

## Event
Properties:

- ID (Primary key)
- Name
- Datetime
- Duration
- Location
- Description
- Organiser (Foreign key?)
- Contact
- Category
- Cost
- RSVP time (nullable)

# Infrastructure
We will need to store the data somewhere. First preference would be a PostgreSQL server, hosted on either GCS or AWS. AWS is cool for me (Tom Lyle) because I am at least familiar with it - but cost will have to be a consideration, as well as security.