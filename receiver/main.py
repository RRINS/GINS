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

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    s.bind((HOST, PORT))
    while True:
        s.listen()
        conn, addr = s.accept()
        print("Setup done")
        with conn:
            print(f"Connected by {addr}")
            while True:
                data = ser.readline()
                if data:
                    print(f"Received: {data}")
                    conn.send(data)
                else:
                    conn.send(b"Nothin");
                        
                clientData = conn.recv(1024)
                if clientData != "":
                    conn.sendall(clientData)
                    print(clientData)
