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
while True:
    print("Waiting for client...")

    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.bind((HOST, PORT))
        s.listen()
        conn, addr = s.accept()
        conn.setblocking(False)
        
        try:
            print("Client connected")
            ser.reset_input_buffer()
            with conn:
                print(f"Connected by {addr}")
                while True:
                    data = ser.readline()
                    if data:
                        print(f"Received: {data}")
                        conn.sendall(data)
                    else:
                        print(b"Nothin");
                        
                    try:
                        clientData = conn.recv(1024)
                        conn.sendall(clientData)
                    except BlockingIOError:
                        print(b"Nothing from client")
                    except BrokenPipeError:
                        print(b"Client disconnected")
                    except:
                        print(b"Catch all")
        except:
            print("Client disconnected")
