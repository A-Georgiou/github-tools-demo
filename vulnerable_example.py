import os

def insecure_function():
    # This function contains a command injection vulnerability
    user_input = input("Enter a filename to list: ")
    os.system("ls " + user_input)

if __name__ == "__main__":
    insecure_function()