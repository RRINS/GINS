import socket

HOST = "169.254.26.252"
PORT = 9001
print("Test")

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
	s.bind((HOST, PORT))
	s.listen()
	conn, addr = s.accept()
	print("Setup done")
	with conn:
		print(f"Connected by {addr}")
		while True:
			data = conn.recv(1024)
			print(data)
			if not data:
				break
			conn.sendall(data)
