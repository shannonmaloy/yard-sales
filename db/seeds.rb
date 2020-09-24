# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
sale = Sale.create([
    {user_id: 3, lat: "34.297477", lng: "-84.886734" , address: "35 Knight Drive", city: "Adairsville", state: "GA", zip: "30103",description: "Furniture, Baby Clothes", date: "2020-10-10", start_time: "2020-10-10 8:30:00", end_time: "2020-10-03 18:00:00"},
    {user_id: 3, lat: "33.783811", lng: "-84.383810", address: "1080 Peachtree St", city: "Atlanta", state: "GA", zip: "30309",description: "Great furniture", date: "2020-10-04", start_time: "2020-09-30 10:30:00", end_time: "2020-09-30 17:00:00"},
    {user_id: 4, lat: "33.851366", lng: "-84.341292", address: "2316 Valley Brook Way", city: "Atlanta", state: "GA", zip: "30319",description: "Electronics", date: "2020-10-03", start_time: "2020-10-04 7:30:00", end_time: "2020-10-04 17:00:00"},
    {user_id: 5, lat: "33.875832", lng: "-84.373101", address: "460 Valley Green Drive", city: "Atlanta", state: "GA", zip: "30548",description: "Antiques, Furniture, Electronics", date: "2020-10-10", start_time: "2020-10-03 8:30:00", end_time: "2020-10-03 18:00:00"},
    {user_id: 6, lat: "33.776738", lng: "-84.360191", address: "830 Greenwood Ave", city: "Atlanta", state: "GA", zip: "30306",description: "Clothes, sports equipment", date: "2020-09-26", start_time: "2020-09-30 10:30:00", end_time: "2020-09-30 17:00:00"},
    {user_id: 4, lat: "33.764042", lng: "-84.334126", address: "360 Brooks Ave", city: "Atlanta", state: "GA", zip: "30310",description: "Lots of great stuff!  Xbox, Flat Screen.  Piano", date: "2020-10-03", start_time: "2020-10-04 7:30:00", end_time: "2020-10-04 17:00:00"},
    
    ])

