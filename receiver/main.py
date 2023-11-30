import time
import serial

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
        else:
            print("Nothin");
    
except KeyboardInterrupt:
    print("Done.")
    ser.close()
