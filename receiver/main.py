import time
import serial
import socket

HOST = "169.254.26.252"
PORT = 9001

ser = serial.Serial(
    port='/dev/ttyS0',
    baudrate=9600,
    timeout=1,
)
print("test")

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    # s.setblocking(False)
    s.bind((HOST, PORT))
    s.listen()
    conn, addr = s.accept()
    conn.setblocking(False)
    
    print("Setup done")
    with conn:
        print(f"Connected by {addr}")
        while True:
            data = ser.readline()
            if data:
                print(f"Received: {data}")
                conn.sendall(data)
            else:
                print(b"Nothin");
                conn.sendall(b"Nothin");
                
            print("balls")
            try:
                clientData = conn.recv(1024)
                conn.sendall(clientData)
            except BlockingIOError:
                print(b"Nothing from client")
