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

# Enumerate all files an encrypt them