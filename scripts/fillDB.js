try{
    db.users.insertMany([
    {
        "nombre":"Nombre1",
        "apellido":"Apellido1",
        "email":"e1",
        "passowrd":"pass1"
    },
    {
        "nombre":"Nombre2",
        "apellido":"Apellido2",
        "email":"e2",
        "passowrd":"pass2"
    },
    {
        "nombre":"Nombre2",
        "apellido":"Apellido2",
        "email":"e3",
        "passowrd":"pass2"
    },
    {
        "nombre":"Nombre2",
        "apellido":"Apellido2",
        "email":"e4",
        "passowrd":"pass2"
    }
])}
catch (e){
    print ("Error inserting users")
    print (e);
}