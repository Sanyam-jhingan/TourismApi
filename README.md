# Tourism API

1. Fork the repository
2. Create a new Heroku app
3. Choose Github as deployment method and connect to your   
   github account.
5. Go to Resources -> Add-ons -> Heroku Postgres and add it.
6. Now deploy the app to Heroku.
7. Open your terminal and run this command:
   ```
   heroku pg:psql --app <name-of-your-app>
   ```
   Make sure you have psql installed.
8. Now you can access the database.
9. Now create `states` table in the database:
    ```
    CREATE TABLE states (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) UNIQUE NOT NULL,
    );
    ```
10. Now create `tourist_places` table in the database:
    ```
    CREATE TABLE tourist_places (
        id SERIAL PRIMARY KEY,
        state_id INTEGER,
        name VARCHAR UNIQUE NOT NULL,
        description VARCHAR NOT NULL,
        FOREIGN KEY (state_id) REFERENCES states(id) on delete cascade
    );
    ```
11. Now use the api to add some data to the database.
12. ???
13. Profit!
