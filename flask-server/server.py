from flask import Flask, jsonify, request
import requests
import math
import numpy as np
from PIL import Image
from osgeo import gdal
import leafmap
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/get_elevation', methods=['POST'])
def get_elevation():
    try:
        # Get latitude and longitude from user input
        lat = request.json['latitude']
        lon = request.json['longitude']
        
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

        # Download elevation data
        url = leafmap.download_ned(region, return_url=True)[0]
        response = requests.get(url)
        
        # Save image to a file
        out_dir = "DEM_data" + str(12) + ".tif"
        with open(out_dir, 'wb') as f:
            f.write(response.content)
        
        # Open the image and extract elevation data
        ds = gdal.Open(out_dir)
        imarray = np.array(ds.GetRasterBand(1).ReadAsArray())
        
        # Extract a portion of the elevation data
        # Adjust these coordinates as needed
        xcoord, ycoord = 2000, 2000
        elevation_data = imarray[xcoord-200:xcoord+200, ycoord-200:ycoord+200].tolist()
        
        return jsonify({'elevation': elevation_data}), 200
    
    except Exception as e:
        return jsonify({'error': 'Failed to retrieve elevation', 'details': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)

