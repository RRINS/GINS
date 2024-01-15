from time import time, ctime
import serial
import socket
import os

HOST = "169.254.26.252"
PORT = 9001

ser = serial.Serial(
    port='/dev/ttyS0',
    baudrate=9600,
    timeout=1,
)


scriptDir = os.path.dirname(os.path.abspath(__file__))

DATADIR = "data/"
FILENAME = ctime(time()).replace(" ", "_")
FULLFILEPATH = os.path.join(scriptDir, DATADIR + FILENAME + ".txt")
print(FULLFILEPATH)
print(os.path.exists(FULLFILEPATH))
open(FULLFILEPATH, "x")

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
                        
                        file = open(FULLFILEPATH, "a")
                        file.write(data.decode('utf8'))
                        file.close()
                        
                    try:
                        clientData = conn.recv(1024)
                        clientText = clientData.decode('utf-8').split()

                        if len(clientText) == 0:
                            break;

                        elif "PrintDataDir" in clientText[0]:
                            fileList = os.listdir(DATADIR);
                            message = "{{ 'command': '{0}','filenames': {1} }}".format(clientText[0], fileList)
                            conn.sendall(message.encode('utf8'))
                            
                        elif "TransmitFile" in clientText[0] and len(clientText) >= 2:
                            fileToRead = DATADIR + clientText[1]
                            if os.path.isfile(fileToRead):
                                fileToReadStream = open(fileToRead, 'r')
                                fileContents = fileToReadStream.read()
                                fileContents = fileContents.replace("\"", "").split('\n')
                                print(fileContents)
                                
                                message = "{{ 'command': '{0}', 'filename': '{1}', 'contents': {2} }}".format(clientText[0], clientText[1], fileContents)
                                conn.sendall(message.encode('utf8'))
                                
                            else:
                                print("File does not exist")
                        
                    except BlockingIOError:
                        print(b"Nothing from client")
                    except BrokenPipeError as e:
                        print(b"Client disconnected", str(e))
                    except Exception as e:
                        print(b"Catch all", str(e))
        except Exception as e:
            print("Client disconnected", str(e))
