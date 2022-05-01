/*
  SCALE OF PLANET SIZE COMPARED TO EARTH
  ==================================
  Mercury --> 0.4
  Venus   --> 0.9
  Earth   --> 1
  Mars    --> 0.5
  Jupiter --> 11
  Saturn  --> 9
  Uranus  --> 4
  Neptune --> 3

  SCALE OF DISTANCE FROM THE SUN COMPARED TO EARTH
  ================================================
  Mercury --> 0.38
  Venus   --> 0.72
  Earth   --> 1
  Mars    --> 1.5
  Jupiter --> 5.2
  Saturn  --> 9.5
  Uranus  --> 19.2
  Neptune --> 30.1
*/

const environment = {
    cam: {
      x: 12,
      y: 0,
      z: 15,
    },
    sun: {
        radius: 4,
        widthSegment: 32,
        heightSegment: 16,
    },
    planets: {
      mercury: {
        radius: 1,
        widthSegment: 32,
        heightSegment: 16,
      },
      venus: {
        radius: 1,
        widthSegment: 32,
        heightSegment: 16,
      },
      earth: {
        radius: 1,
        widthSegment: 32,
        heightSegment: 16,
      },
      mars: {
        radius: 1,
        widthSegment: 32,
        heightSegment: 16,
      },
      jupiter: {
        radius: 1,
        widthSegment: 32,
        heightSegment: 16,
      },
      saturn: {
        radius: 1,
        widthSegment: 32,
        heightSegment: 16,
      },
      uranus: {
        radius: 1,
        widthSegment: 32,
        heightSegment: 16,
      },
      neptune: {
        radius: 1,
        widthSegment: 32,
        heightSegment: 16,
      },
    }
  }

  export default environment