'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Beaches',
        [
            {
                api_id: 238,
                name: 'Oceanside Harbor',
                location: 'Oceanside',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                api_id: 594,
                name: 'Oceanside Pier',
                location: 'Oceanside',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                api_id: 628,
                name: 'Wisconsin',
                location: 'Oceanside',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                api_id: 629,
                name: 'Cassidy',
                location: 'Oceanside',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                api_id: 237,
                name: 'Tamarack',
                location: 'Carlsbad',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                api_id: 596,
                name: 'Warm Water Jetty',
                location: 'Carlsbad',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                api_id: 597,
                name: 'Terra Mar',
                location: 'Carlsbad',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                api_id: 630,
                name: 'Campground',
                location: 'Carlsbad',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                api_id: 236,
                name: 'Ponto',
                location: 'Carlsbad',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                api_id: 400,
                name: 'Grandview',
                location: 'Encinitas',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                api_id: 235,
                name: 'Beacons',
                location: 'Encinitas',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                api_id: 401,
                name: 'D Street',
                location: 'Encinitas',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                api_id: 234,
                name: 'Swamis',
                location: 'Encinitas',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                api_id: 232,
                name: 'Cardiff Reef',
                location: 'Cardiff',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                api_id: 230,
                name: '15th Street - Del Mar',
                location: 'Del Mar',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                api_id: 754,
                name: 'Torrey Pines State Beach',
                location: 'La Jolla',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                api_id: 229,
                name: 'Blacks Beach',
                location: 'La Jolla',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                api_id: 228,
                name: 'Scripps Pier',
                location: 'La Jolla',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                api_id: 227,
                name: 'Windansea',
                location: 'La Jolla',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                api_id: 398,
                name: "Bird Rock",
                location: 'La Jolla',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                api_id: 399,
                name: 'Tourmaline',
                location: 'San Diego',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                api_id: 226,
                name: 'Pacific Beach',
                location: 'San Diego',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                api_id: 397,
                name: 'Mission Beach',
                location: ' San Diego',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                api_id: 225,
                name: 'Ocean Beach Pier',
                location: 'San Diego',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                api_id: 224,
                name: 'Sunset Cliffs',
                location: 'San Diego',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                api_id: 223,
                name: 'Imperial Beach',
                location: 'Imperial Beach',
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ])
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Beaches', null, {})
  }
};
