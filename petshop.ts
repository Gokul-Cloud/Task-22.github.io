type typeOfpets = "dog" | "cat" | "owl" | "rabbit" | "Hamster";
type gender = "male" | "female";
type petorigin = "local breed" | "imported breed";
interface petdetails {
    petsType: typeOfpets;
    petGen: gender;
    PetOrigin: petorigin;
}
class petrequest implements petdetails {
    petTag: string;
    petsType: typeOfpets;
    petGen: gender;
    PetOrigin: petorigin;

    constructor(petsType: typeOfpets, petGen: gender, petOrigin: petorigin) {
        this.petTag = "tag:" + Math.floor(Math.random() * 10)
        this.petsType = petsType;
        this.petGen = petGen;
        this.PetOrigin = petOrigin;
    }

}
class animal implements petdetails {
    petTag: string;
    petsType: typeOfpets;
    petGen: gender;
    PetOrigin: petorigin;
    Tagname: string;
    ispetAvailable: boolean = false;
    petAvailableFrom: Date = new Date();

    constructor(petsType: typeOfpets, petGen: gender, petOrigin: petorigin) {
        let Tagname: string[] = ["A", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l",];
        this.petTag = "Pet_" + Math.floor(Math.random() * 10000);
        this.Tagname = Tagname[Math.floor(Math.floor(Math.random() * 12))];
        this.petsType = petsType;
        this.petGen = petGen;
        this.PetOrigin = petOrigin;
    } 
}

class Requirement {
    currentpetrequests: petrequest[] = [];
  
    constructor() {}
  
    // Method to insert a request for pets
    putRequest(request: petrequest): petrequest {
      this.currentpetrequests.push(request);
      return request;
    }  
  
    getAllRequests(): petrequest[]{
      return this.currentpetrequests;
    }
  
    // Method to retrieve the status of the five requests
    getpetrequestStatus(availability: Availability): Array<{request: petrequest, available: boolean}> {
      let petrequestStatus: Array<{request: petrequest, available: boolean}> = [];
      for (let i = 0; i < 5; i++) {
        petrequestStatus.push({
          request: this.currentpetrequests[i],
          available: availability.getAdoptionStatus(this.currentpetrequests[i]) !== undefined,
        });
    }
      return petrequestStatus;
    }
  }
  class Availability {
    currentAvailablePets: animal[] = [];
  
    constructor() {}
  
    // Method to find the adoption status for the input request
    getAdoptionStatus(request: petrequest): animal | undefined {
      return this.currentAvailablePets.find((Animal) => {
        if (
          Animal.petsType === request.petsType &&
          Animal.petGen === request.petGen &&
          Animal.PetOrigin === request.PetOrigin
        ) {
          return animal;
        }
      });
    }
  
    // Method to make different kinds of animals available at pet store
    addPetsToStore(animal: animal): animal[] {
      animal.ispetAvailable = true;
      animal.petAvailableFrom = new Date();
      this.currentAvailablePets.push(animal);
      return this.currentAvailablePets;
    }
  
    // Method to find the number of animals in each type of animals
    getPetsCount(): {dog:number, cat:number,owl: number, rabbits: number, Hamster:number, others:number}{
      let animalCount = {dog: 0, cat: 0, owl: 0, rabbits: 0,Hamster:0, others: 0}
      this.currentAvailablePets.forEach(animal => {
        switch (animal.petsType){
          case "dog" :  {
            animalCount.dog++;
            break;
          }
          case "cat" :  {
            animalCount.cat++;
            break;
          }
          case "owl" :  {
            animalCount.owl++;
            break;
          }
          case "rabbit" :  {
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
      })
      return animalCount;
    }

mapAnimalsToRequests(requests: petrequest[]):Array<{animal: animal, petrequests: petrequest[]}>{
    let map: Array<{animal: animal, petrequests: petrequest[]}> = []
    const petrequests = requests;
    this.currentAvailablePets.forEach(animal => {
      let animalToRequestMap = {animal: animal, petrequests};
      animalToRequestMap.petrequests = petrequests.filter(request => {
        return (animal.petsType === request.petsType) && (animal.petGen === request.petGen) && (animal.PetOrigin === request.PetOrigin)
      });
      
      map.push(animalToRequestMap);
    })
    return map;
  }
}

const availability = new Availability();
const requirement = new Requirement();


const animal1 = new animal("dog", "male", "imported breed");
const animal2 = new animal("cat", "female", "local breed");
const animal3 = new animal("owl", "female", "local breed");
const animal4 = new animal("rabbit", "male", "imported breed");
const animal5 = new animal("cat", "male", "imported breed");
const animal6 = new animal("dog", "female", "imported breed");
const animal7 = new animal("dog", "male", "imported breed");
const animal8 = new animal("owl", "female", "local breed");
const animal9 = new animal("rabbit", "female", "local breed");
const animal10 = new animal("cat", "female", "local breed");

availability.addPetsToStore(animal1);
availability.addPetsToStore(animal2);
availability.addPetsToStore(animal3);
availability.addPetsToStore(animal4);
availability.addPetsToStore(animal5);
availability.addPetsToStore(animal6);
availability.addPetsToStore(animal7);
availability.addPetsToStore(animal8);

const request1 = new petrequest("owl", "male", "imported breed");
const request2 = new petrequest("cat", "male", "local breed"); // This requirement will not be satisfied
const request3 = new petrequest("rabbit", "female", "local breed");
const request4 = new petrequest("cat", "female", "local breed");
const request5 = new petrequest("dog", "female", "local breed");
const request6 = new petrequest("rabbit", "male", "imported breed");
const request7 = new petrequest("dog", "male", "local breed");
const request8 = new petrequest("dog", "male", "local breed");
const request9 = new petrequest("dog", "male", "local breed");
const request10 = new petrequest("dog", "male", "local breed");
const request11 = new petrequest("dog", "male", "local breed");
const request12 = new petrequest("dog", "male", "local breed");

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
console.log('Pet Availability Status for first 5 Requests',requirement.getpetrequestStatus(availability));
console.log('Total Pets Count based on the type of pet',availability.getPetsCount());
console.log('Map of Pet available to current requests',availability.mapAnimalsToRequests(requirement.getAllRequests()));