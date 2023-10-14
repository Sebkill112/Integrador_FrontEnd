module.exports = {
    obtenerToken() {
        const cookies = document.cookie.split('; ');
    
        for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].split('=');
          if (cookie[0] === 'jwtToken') {
            return cookie[1];
          }
        }
    
        return null; // Retorna null si no se encontró la cookie 'jwtToken'.
      }
}