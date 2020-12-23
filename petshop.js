var petrequest = /** @class */ (function () {
    function petrequest(petsType, petGen, petOrigin) {
        this.petTag = "tag:" + Math.floor(Math.random() * 10);
        this.petsType = petsType;
        this.petGen = petGen;
        this.PetOrigin = petOrigin;
    }
    return petrequest;
}());
var animal = /** @class */ (function () {
    function animal(petsType, petGen, petOrigin) {
        this.ispetAvailable = false;
        this.petAvailableFrom = new Date();
        var Tagname = ["A", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l",];
        this.petTag = "Pet_" + Math.floor(Math.random() * 10000);
        this.Tagname = Tagname[Math.floor(Math.floor(Math.random() * 12))];
        this.petsType = petsType;
        this.petGen = petGen;
        this.PetOrigin = petOrigin;
    }
    return animal;
}());
var Requirement = /** @class */ (function () {
    function Requirement() {
        this.currentpetrequests = [];
    }
    // Method to insert a request for pets
    Requirement.prototype.putRequest = function (request) {
        this.currentpetrequests.push(request);
        return request;
    };
    Requirement.prototype.getAllRequests = function () {
        return this.currentpetrequests;
    };
    // Method to retrieve the status of the five requests
    Requirement.prototype.getpetrequestStatus = function (availability) {
        var petrequestStatus = [];
        for (var i = 0; i < 5; i++) {
            petrequestStatus.push({
                request: this.currentpetrequests[i],
                available: availability.getAdoptionStatus(this.currentpetrequests[i]) !== undefined
            });
        }
        return petrequestStatus;
    };
    return Requirement;
}());
var Availability = /** @class */ (function () {
    function Availability() {
        this.currentAvailablePets = [];
    }
    // Method to find the adoption status for the input request
    Availability.prototype.getAdoptionStatus = function (request) {
        return this.currentAvailablePets.find(function (Animal) {
            if (Animal.petsType === request.petsType &&
                Animal.petGen === request.petGen &&
                Animal.PetOrigin === request.PetOrigin) {
                return animal;
            }
        });
    };
    // Method to make different kinds of animals available at pet store
    Availability.prototype.addPetsToStore = function (animal) {
        animal.ispetAvailable = true;
        animal.petAvailableFrom = new Date();
        this.currentAvailablePets.push(animal);
        return this.currentAvailablePets;
    };
    // Method to find the number of animals in each type of animals
    Availability.prototype.getPetsCount = function () {
        var animalCount = { dog: 0, cat: 0, owl: 0, rabbits: 0, Hamster: 0, others: 0 };
        this.currentAvailablePets.forEach(function (animal) {
            switch (animal.petsType) {
                case "dog": {
                    animalCount.dog++;
                    break;
                }
                case "cat": {
                    animalCount.cat++;
                    break;
                }
                case "owl": {
                    animalCount.owl++;
                    break;
                }
                case "rabbit": {
                    animalCount.rabbits++;
                    break;
                }
                case "Hamster": {
                    animalCount.Hamster++;
                }
                default: {
                    animalCount.others++;
                    break;
                }
            }
        });
        return animalCount;
    };
    Availability.prototype.mapAnimalsToRequests = function (requests) {
        var map = [];
        var petrequests = requests;
        this.currentAvailablePets.forEach(function (animal) {
            var animalToRequestMap = { animal: animal, petrequests: petrequests };
            animalToRequestMap.petrequests = petrequests.filter(function (request) {
                return (animal.petsType === request.petsType) && (animal.petGen === request.petGen) && (animal.PetOrigin === request.PetOrigin);
            });
            map.push(animalToRequestMap);
        });
        return map;
    };
    return Availability;
}());
var availability = new Availability();
var requirement = new Requirement();
var animal1 = new animal("dog", "male", "imported breed");
var animal2 = new animal("cat", "female", "local breed");
var animal3 = new animal("owl", "female", "local breed");
var animal4 = new animal("rabbit", "male", "imported breed");
var animal5 = new animal("cat", "male", "imported breed");
var animal6 = new animal("dog", "female", "imported breed");
var animal7 = new animal("dog", "male", "imported breed");
var animal8 = new animal("owl", "female", "local breed");
var animal9 = new animal("rabbit", "female", "local breed");
var animal10 = new animal("cat", "female", "local breed");
availability.addPetsToStore(animal1);
availability.addPetsToStore(animal2);
availability.addPetsToStore(animal3);
availability.addPetsToStore(animal4);
availability.addPetsToStore(animal5);
availability.addPetsToStore(animal6);
availability.addPetsToStore(animal7);
availability.addPetsToStore(animal8);
var request1 = new petrequest("owl", "male", "imported breed");
var request2 = new petrequest("cat", "male", "local breed"); // This requirement will not be satisfied
var request3 = new petrequest("rabbit", "female", "local breed");
var request4 = new petrequest("cat", "female", "local breed");
var request5 = new petrequest("dog", "female", "local breed");
var request6 = new petrequest("rabbit", "male", "imported breed");
var request7 = new petrequest("dog", "male", "local breed");
var request8 = new petrequest("dog", "male", "local breed");
var request9 = new petrequest("dog", "male", "local breed");
var request10 = new petrequest("dog", "male", "local breed");
var request11 = new petrequest("dog", "male", "local breed");
var request12 = new petrequest("dog", "male", "local breed");
requirement.putRequest(request1);
requirement.putRequest(request2);
requirement.putRequest(request3);
requirement.putRequest(request4);
requirement.putRequest(request5);
requirement.putRequest(request6);
requirement.putRequest(request7);
requirement.putRequest(request8);
requirement.putRequest(request9);
requirement.putRequest(request10);
requirement.putRequest(request11);
requirement.putRequest(request12);
// Get status of five requirements of the request for animals
console.log('Pet Availability Status for first 5 Requests', requirement.getpetrequestStatus(availability));
console.log('Total Pets Count based on the type of pet', availability.getPetsCount());
console.log('Map of Pet available to current requests', availability.mapAnimalsToRequests(requirement.getAllRequests()));
