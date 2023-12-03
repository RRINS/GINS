import socket

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

s.connect(("169.254.174.132", 9000))

s.send(b"Hello, world!")

data = s.recv(1024)

print(data)

s.close()