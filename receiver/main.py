import time
import serial
import socket

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.connect(("169.254.57.66", 9000))

ser = serial.Serial(
    port='/dev/ttyS0',
    baudrate=9600,
    timeout=1,
)

try:
    while True:
        data = ser.readline()
        if data:
            print(f"Received: {data}")
            s.send(data)
        else:
            s.send(b"Nothin");
    
except KeyboardInterrupt:
    print("Done.")
    ser.close()
    s.close()
