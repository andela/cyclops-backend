import http from 'http';
import app from './app';

const port = process.env.PORT || 1000;
const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default server;
