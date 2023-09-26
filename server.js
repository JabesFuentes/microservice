const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));

app.use('/views', express.static('script.js', {
  setHeaders: (res, path) => {
    if (path.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    }
  },
}));


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// Ruta principal que devuelve la hora actual si no se proporciona una fecha
app.get('/api', (req, res) => {
  const currentDate = new Date();
  res.json({
    unix: currentDate.getTime(),
    utc: currentDate.toUTCString()
  });
});

// Ruta que recibe una fecha como parámetro y devuelve su representación en formato UNIX y UTC
app.get('/api/:date', (req, res) => {
  const { date } = req.params;
  let parsedDate;

  if (!date) {
    // Si no se proporciona una fecha, se usa la fecha actual
    parsedDate = new Date();
  } else {
    parsedDate = new Date(date);
  }

  if (isNaN(parsedDate.getTime())) {
    // La fecha no es válida
    res.json({ error: 'Invalid Date' });
  } else {
    // La fecha es válida
    res.json({
      unix: parsedDate.getTime(),
      utc: parsedDate.toUTCString()
    });
  }
});

// Iniciar el servidor en el puerto 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
