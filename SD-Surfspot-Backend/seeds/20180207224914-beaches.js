'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Beaches',
        [
            {
                name: 'Oceanside Harbor',
                location: 'Oceanside',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Oceanside Pier',
                location: 'Oceanside',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Wisconsin',
                location: 'Oceanside',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Cassidy',
                location: 'Oceanside',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Tamarack',
                location: 'Carlsbad',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Warm Water Yetty',
                location: 'Carlsbad',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Terra Mar',
                location: 'Carlsbad',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Campground',
                location: 'Carlsbad',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Ponto',
                location: 'Carlsbad',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Grandview',
                location: 'Encinitas',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Beacons',
                location: 'Encinitas',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'D Street',
                location: 'Encinitas',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Swamis',
                location: 'Encinitas',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Cardiff Reef',
                location: 'Cardiff',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: '15th Street',
                location: 'Del Mar',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Torrey Pines State Beach',
                location: 'La Jolla',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Blacks Beach',
                location: 'La Jolla',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Scripps Pier',
                location: 'La Jolla',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Windansea',
                location: 'La Jolla',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: "Bird Rock",
                location: 'La Jolla',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Tourmaline',
                location: 'San Diego',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Pacific Beach',
                location: 'San Diego',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Mission Beach',
                location: ' San Diego',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Ocean Beach Pier',
                location: 'San Diego',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Sunset Cliffs',
                location: 'San Diego',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
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
