import os
from PIL.Image import open
from rembg import remove

for name in os.listdir('team'):
    input_path = f'team/{name}'
    output_path = f'team/p/{name}'
    remove(open(input_path)).save(output_path, format='png')
    print(f'Removed bg of {name.split('.')[0]}')

