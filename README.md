# camper_api routes

/v1/bootcamps - GET ALL bootcamps
/v1/bootcamps - POST Create New bootcamp

/v1/bootcamp/60a2568329ace81dc027228b GET
/v1/bootcamp/60a2568329ace81dc027228b PUT
/v1/bootcamp/60a2568329ace81dc027228b DELETE
Query
/v1/bootcamps?averageCost=10000&phone=(111) 111-1112
http://localhost:4001/v1/bootcamps?location.state=MA&location.city=Lowell
http://localhost:4001/v1/bootcamps?careers[in]=Business
http://localhost:4001/v1/bootcamps?select=name,description&location.state=MA
http://localhost:4001/v1/bootcamps?select=name,description&sort=name --asc
http://localhost:4001/v1/bootcamps?select=name,description&sort=-name --desc
http://localhost:4001/v1/bootcamps?limit=2&select=name&page=2 = second page and limit 2
http://localhost:4001/v1/bootcamps?limit=2 - first page = two records
http://localhost:4001/v1/bootcamps?limit=1&select=name&page=2
http://localhost:4001/v1/courses
http://localhost:4001/v1/bootcamps/5d725a1b7b292f5f8ceff788/courses

DETELE-
http://localhost:4001/v1/courses/5d725c84c4ded7bcb480eaa0
PUT -
http://localhost:4001/v1/courses/5d725ce8c4ded7bcb480eaa3
{"tuition": 9002
}
/v1/bootcamps?averageCost{gte}=100 --does not work yet
/v1/bootcamps/radius/02118/100 GET - bring 3
/v1/bootcamps/radius/02118/10 GET - bring 1
node seeder.js -i
node seeder.js -d

query
/v1/bootcamps?averageCost[gte]=8000&location.state=RI
