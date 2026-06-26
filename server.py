import http.server
import socketserver
import os
import ssl
# Puerto en el que se ejecutará el servidor
PORT = 8001
# Directorio actual donde se encuentran los archivos del sitio web
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    """Manejador personalizado para servir archivos desde el directorio del script."""
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

def start_server():
    """Inicia el servidor local en el puerto especificado."""
    try:
        with socketserver.TCPServer(("0.0.0.0", PORT), Handler) as httpd:
            print(f"\n========================================")
            print(f" Servidor iniciado en: http://localhost:{PORT}")
            print(f" Sirviendo archivos desde: {DIRECTORY}")
            print(f" Presiona Ctrl+C para detener el servidor")
            print(f"========================================\n")
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServidor detenido por el usuario.")
    except Exception as e:
        print(f"Error al iniciar el servidor: {e}")

if __name__ == "__main__":
    start_server()

def start_server_fallback(port):
    """Inicia el servidor en un puerto alternativo si el 443 falla."""
    try:

        context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
        context.load_cert_chain(certfile="cert.pem", keyfile="key.pem")
        with socketserver.TCPServer(("0.0.0.0", port), Handler) as httpd:
            httpd.socket = context.wrap_socket(httpd.socket, server_side=True)
            print(f" Servidor HTTPS iniciado en: https://localhost:{port}")
            httpd.serve_forever()
    except Exception as e:
        print(f"Error en fallback: {e}")

if __name__ == "__main__":
    start_server()
