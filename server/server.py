from flask import Flask, jsonify, request
import requests
import math
import numpy as np
from PIL import Image
import rasterio
import keras
import leafmap
from flask import Flask, request, send_file, render_template, Response
import numpy as np
import os
import io
import torch
import scipy.io.wavfile as wavfile
import torchaudio
import matplotlib.pyplot as plt 
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])
@app.route('/')
def index():
    return "test"

@app.route('/hello', methods=['POST'])
def test():
    return "World"

@app.route('/get_elevation', methods=['POST'])
def get_elevation():
    try:
        print("Hi")
        # Get latitude and longitude from user input
        lat = float(request.json['latitude'])
        lon = float(request.json['longitude'])
        
        print(lat,lon)
        # Radius of the Earth
        R = 6378137
        
        # Coordinate offsets in radians
        dn = 1000
        de = 1000
        dLat = dn / R
        dLon = de / (R * math.cos(math.pi * lat / 180))

        # OffsetPosition, decimal degrees
        latO = lat + dLat * 180 / math.pi
        lonO = lon + dLon * 180 / math.pi
        region = [lon, lat, lonO, latO]
        print(region)
        # Download elevation data
        url = leafmap.download_ned(region, return_url=True)[0]
        response = requests.get(url)
        print("Let's go")
        # Save image to a file
        out_dir = "C:\\Users\\34e65\\Downloads\\MusicGen\\DEMDATA.tiff"
        with open(out_dir, 'wb') as f:
            f.write(response.content)
        
        img = Image.open(out_dir)
        imarray = np.array(img)
    
        # Open the raster file
        with rasterio.open(out_dir) as ds:
            # Reading basic properties
            width = ds.width
            height = ds.height
            # Fetching the transformation matrix
            gt = ds.transform
            # Calculating bounding coordinates
            minx, miny = gt * (0, height)
            maxx, maxy = gt * (width, 0)
            
            # Calculation of coordinates as per given lat, lon (need to provide these)
            ycoord = height - int(10812 * (lat - miny) / (maxy - miny))
            xcoord = int(10812 * (lon - minx) / (maxx - minx))
        test_img = imarray[xcoord-200:xcoord+200, ycoord-200:ycoord+200]
        new_model = keras.models.load_model('my_model.h5')
        if(np.argmax(new_model.predict(test_img.reshape(1,200,200,1)))==1):
            print("It's unstable")
        else:
            print("It's stable")
        plt.contour(imarray[xcoord-200:xcoord+200, ycoord-200:ycoord+200],
            cmap = "viridis", levels = list(range(-20, 1200, 100)))# 20 levels and Red-Gray colormap
        plt.scatter(200, 200, c="r")
        plt.title('Contour Plot of 2D Array')
        plt.xlabel('X coordinate')
        plt.ylabel('Y coordinate')
        plt.show()
        image_path = 'contour_plot.png'
        plt.savefig(image_path)
        plt.close()

        # Prepare the byte array to be sent as a response
        #img_byte_arr = img_byte_arr.getvalue()

        print('this is end of file')

        return send_file(
            "contour_plot.png",
            mimetype='image/png',
            as_attachment=True,
            download_name='converted_image.png'
        )
    
    except Exception as e:
        print(e)

if __name__ == '__main__':
    app.run(debug=True)