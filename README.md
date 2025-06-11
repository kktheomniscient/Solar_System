# Solar System Simulation

An interactive 3D simulation of our solar system built with Three.js and Vite.

## Features

- Realistic planetary orbits and rotations
- Interactive camera controls
- Pause/Resume functionality
- Adjustable revolution and rotation speeds for each planet
- Realistic textures and lighting
- Background star field
- Keyboard controls for camera movement

## Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)

## Installation

1. Clone the repository:
```bash
git clone (repo link)
cd Solar_System
```

2. Install dependencies:
```bash
npm install
```

## Running the Project

1. Start the development server:
```bash
npm run dev
```

2. Open your browser and navigate to:
```
http://localhost:5173
```

## Controls

### Camera Controls
- **W**: Move camera forward
- **S**: Move camera backward
- **A**: Move camera left
- **D**: Move camera right
- **Space**: Move camera up
- **Shift**: Move camera down
- **Mouse**: Click and drag to rotate view
- **Scroll**: Zoom in/out

### Interface Controls
- **Revolution Control**: Adjust orbital speeds of planets
- **Rotation Control**: Adjust rotation speeds of planets
- **Pause Button**: Stop/Resume all animations

## Project Structure

```
Solar_System/
├── src/
│   ├── main.js        # Main application logic
│   └── style.css      # Styles
├── public/            # Texture images
│   ├── sun.jpg
│   ├── mercury.jpg
│   ├── venus.jpg
│   └── ...
├── index.html
├── package.json
└── vite.config.js
```

## Required Textures

Place the following texture files in your `public` directory:
- stars_milky_way.jpg
- sun.jpg
- mercury.jpg
- venus.jpg
- earth.jpg
- earth_normal.jpg
- moon.jpg
- moon_normal.jpg
- mars.jpg
- jupiter.jpg
- saturn.jpg
- saturn_ring.jpg
- uranus.jpg
- neptune.jpg
- star.png

## Built With

- [Three.js](https://threejs.org/) - 3D Graphics Library
- [Vite](https://vitejs.dev/) - Frontend Build Tool

## License

This project is licensed under the MIT License - see the LICENSE file for details