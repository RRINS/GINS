import socket
import time

UDP_IP = "127.0.0.100"
UDP_PORT = 8000
MESSAGE = b"{ distance: 90, materialLength: 400, newSpeed: 10 }\n"

while True:
	print("UDP target IP: %s" % UDP_IP)
	print("UDP target port: %s" % UDP_PORT)
	print("message: %s" % MESSAGE)

	sock = socket.socket(socket.AF_INET, # Internet
						 socket.SOCK_DGRAM) # UDP
	sock.sendto(MESSAGE, (UDP_IP, UDP_PORT))
	
	time.sleep(3)

# data, addr = sock.recvfrom(1024) # buffer size is 1024 bytes
# print("received message: %s" % data)
