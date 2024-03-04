const request = require("supertest");
const app = require('../index');


afterAll((done) => {
  app.close(() => {
      done();
  });
});



describe("Operaciones CRUD de cafes", () => {
   
  it("OBTENER UN STATUS 200", async () => {
      const resultado = await request(app).get("/cafes");
      expect(resultado.status).toBe(200);
      expect(Array.isArray(resultado.body)).toBe(true);
      expect(resultado.body.length).toBeGreaterThan(0);
      expect(resultado.body[0]).toHaveProperty("id");
      expect(resultado.body[0]).toHaveProperty("nombre");
  });

    // revisando que al tener un producto con id inexistente devuelva un status 404
    test("debería devolver un código 404 si el café no existe", async () => {
      const idInexistente = 400;
      const resultado = await request(app)
          .delete(`/cafes/${idInexistente}`)
          .expect('Content-Type', /json/)
          .expect(404);
  
      expect(resultado.body).toEqual({ message: 'No se encontró ningún café con ese id' });
  });

      // agrega un producto satisfactoriamente devolviendo un 201 status

      it('agrega un nuevo café y devuelve un código 201', async () => {
        const nuevoCafe = { id: 101, nombre: "Nuevo Café" }; // Cambia los detalles del nuevo café
        const resultado = await request(app).post('/cafes').send(nuevoCafe);
        expect(resultado.status).toBe(201);
        expect(resultado.body).toEqual(expect.arrayContaining([nuevoCafe]));
    });

    it('actualizacion de producto con distinto id', async () => {
        const idInexistente = 9999; // Cambia el id inexistente
        const resultado = await request(app).put(`/cafes/${idInexistente}`);
        expect(resultado.status).toBe(400);
    });
});
