
AOS.init();

const addDishes=document.querySelector("#dishes");
const form=document.querySelector("#form");
const ui=document.querySelector("#userInput");
const spinner=document.querySelector("#spinner");
const details=document.querySelector("#details");
const csbtn=document.querySelector("#cs");
const navbtno=document.querySelector("#cse");
const dp=document.querySelector("#dp");
const cat=document.querySelector("#cat");
const catbtn=document.querySelector("#catbtn");
const formSelect=document.querySelector("#formSelect");
const addDishesSelect=document.querySelector("#dishesCategory");
const home=document.querySelector("#home");
const fav=document.querySelector("#fav");
const catalog=document.querySelector("#catalog");
const home1=document.querySelector("#home1");
const fav1=document.querySelector("#fav1");
const catalog1=document.querySelector("#catalog1");
const catalog2=document.querySelector("#catalog2");
const canvas1=document.querySelector("#canvas1");
const canvas2=document.querySelector("#canvas2");
const canvas3=document.querySelector("#canvas3");
const spinnerSelect=document.querySelector("#spinnerSelect");
const favSpinner=document.querySelector("#favSpinner");
const favDisplay=document.querySelector("#favDisplay");
const err=document.querySelector("#err");
const nav=document.querySelector("#nav");
const hero=document.querySelector("#hero");
const navbtns=document.querySelector("#navbtn");
const nave=document.querySelector(".mbnav");
const body=document.querySelector("body");
const togBtn=document.querySelectorAll(".toggl");
const page=document.querySelector("#sL");
const signForm=document.querySelector("#signIn");
const loginForm=document.querySelector("#login");
const cred=document.querySelector("#cred");
const moon=document.querySelector("#moon");
const xbtn=document.querySelectorAll(".xx");
xbtn.forEach((btn)=>{
    btn.onclick=()=>{
        // details.classList.toggle("ac");
        moon.classList.add("hidden");
        moon.classList.remove("flex");
        body.classList.remove("overflow-hidden");
    }
})
cred.onclick=()=>{
    moon.classList.add("flex");
    moon.classList.remove("hidden");
    body.classList.add("overflow-hidden");
}
// localStorage.clear();
console.log(togBtn)
let data={
    name:"",
    email:"",
    gender:"",
    status:""
}
togBtn.forEach((btn)=>{
    btn.onclick=()=>{
        // alert("Dark mode activated")
        page.classList.toggle("don")
    }

})
signForm.onsubmit=(e)=>{
    e.preventDefault();
    const n=document.querySelector("#name").value;
    const em=document.querySelector("#email").value;
    const male=document.querySelector("#male");
    const female=document.querySelector("#female");
    const s=document.querySelector("#status");
    data.name=n;
    data.email=em;
    data.gender=male.checked ? male.value : female.value;
    data.status=s.value;
    alert(`${data.gender}`)
    fetch("https://gorest.co.in/public/v2/users",{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "accept":"application/json",
            Authorization:"Bearer 3510c89e336ad11062ae26a4b25aed717c072f595586694cd5c996805a950691"},
        body:JSON.stringify(data)
    })
    .then((res)=>res.json())
    .then((data)=>{
        console.log(data);
    alert("User created successfully");

    // Get existing users from localStorage
    let users = JSON.parse(localStorage.getItem("user")) || [];

    // Push the new user to the array
    users.push(data);

    // Save the updated array back to localStorage
    localStorage.setItem("user", JSON.stringify(users));

    // Optional: confirm in console
    console.log("Updated user list:", users);
    })

}
loginForm.onsubmit=(e)=>{
    e.preventDefault();
    const em=document.querySelector("#emailLog").value;
    // alert(em);
    const user=localStorage.getItem("user")||[];
    const userData=JSON.parse(user);
    userData.forEach(i => 
        {
            i.email===em ? alert("User found") : alert("User not found")
        })
}

    // .catch((err)=>{ 
    //     console.log(err);
    //     alert("User not found")
    // })}
     


// })}

// let con=true;
// if( con){
//     body.classList.toggle("overflow-hidden");
// }
// localStorage.clear();

/*
----------------------------------------------------------------------------------------------------------
*/
const carouselSection = document.getElementById("carousel-section");
const imagesContainer = document.getElementById("carousel-images");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const storedFavorites = JSON.parse(localStorage.getItem("fav")) || [];

let imageSources = [];

if (storedFavorites.length > 0) {
  imageSources = storedFavorites.map(meal => ({
    name: meal.strMeal,
    thumbnail: meal.strMealThumb || null // Only if available
  }));
}
else{
    imageSources = [
        {
        name: "No favorites found",
        thumbnail: null
        }
    ];
    setTimeout(() => {
        alert("No favorites found. Please add some meals to your favorites.");
        location.reload();
    }, 60000);
}
// Show section only if we have data
if (imageSources.length > 0) {
  carouselSection.classList.remove("hidden");

  imageSources.forEach(data => {
    const imgWrapper = document.createElement("div");
    imgWrapper.className = "w-full flex-shrink-0 aspect-video bg-gray-100 flex items-center justify-center relative overflow-hidden rounded-xl";

    if (data.thumbnail) {
      const img = document.createElement("img");
      img.src = data.thumbnail;
      img.alt = data.name;
      img.className = "w-full h-full object-cover";
      imgWrapper.appendChild(img);
      const overlay = document.createElement("div");
      overlay.className = `
        absolute inset-0 bgL flex items-center justify-center 
        opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-xl
      `.replace(/\s+/g, ' ').trim();
    
      overlay.innerHTML = `<p class="text-white text-xl font-bold text-center px-2">${data.name}</p>`;
      imgWrapper.appendChild(overlay);
    } else {
      const fallback = document.createElement("div");
      fallback.className = "text-xl border-2 border-red-500 font-semibold text-center text-gray-800 px-4";
      fallback.textContent = data.name;
      imgWrapper.appendChild(fallback);
    }

    imagesContainer.appendChild(imgWrapper);
  });

  let index = 0;

  const updateCarousel = () => {
    const slideWidth = imagesContainer.clientWidth;
    imagesContainer.style.transform = `translateX(-${index * slideWidth}px)`;
  };

  nextBtn.onclick = () => {
    index = (index + 1) % imageSources.length;
    updateCarousel();
  };

  prevBtn.onclick = () => {
    index = (index - 1 + imageSources.length) % imageSources.length;
    updateCarousel();
  };

  setInterval(() => {
    index = (index + 1) % imageSources.length;
    updateCarousel();
  }, 5000);
}


/*
------------------------------------------------------------------------------------------------------------
*/ 
const container=getLocalFavs();
console.log(container);
function getLocalFavs(){
    return JSON.parse(localStorage.getItem("fav")) || [];
}
function setLocalFavs(fav){
    localStorage.setItem("fav",JSON.stringify(fav));
}
function addfav(fav){
    const favList=getLocalFavs();
    const isPresent=favList.some((item)=>item.idMeal===fav.idMeal);
    if(!isPresent){
        favList.push(fav);
        setLocalFavs(favList);
        alert("Added to favorites");
        location.reload();
        
    }
    else{
        alert("Already in favorites");
    }
    // localStorage.setItem("fav",JSON.stringify(fav));
}
home.onclick=()=>{
    hero.classList.add("hidden");
    // alert("Welcome to the Food App! Please enter a dish name to get started.");
    canvas1.classList.remove("hidden");
    canvas2.classList.add("hidden");
    canvas3.classList.add("hidden");
}
navbtns.onclick=()=>{
    nave.classList.toggle("act");
}
navbtno.onclick=()=>{
    nave.classList.toggle("act");
}
nav.onclick=()=>{
    hero.classList.remove("hidden");
    canvas1.classList.add("hidden");
    canvas2.classList.add("hidden");
    canvas3.classList.add("hidden");
}
catalog.onclick=()=>{
    hero.classList.add("hidden");
    canvas1.classList.add("hidden");
    canvas2.classList.remove("hidden");
    canvas3.classList.add("hidden");
}
fav.onclick=()=>{
    hero.classList.add("hidden");
    canvas1.classList.add("hidden");
    canvas2.classList.add("hidden");
    canvas3.classList.remove("hidden");
    favDisplay.innerHTML="";
    if(container.length===0){
        err.classList.remove("hidden");
    }
    else{
        err.classList.add("hidden");
        container.forEach((i, index) => {
            const cd=document.createElement("div");
            cd.setAttribute('data-aos', 'fade-up');
            cd.setAttribute('data-aos-delay', `${index * 100}`);
            cd.innerHTML=`
            <img src="${i.strMealThumb}" alt="">
            <h2>${i.strMeal}</h2>
            `;
            cd.onclick=()=>{
                details.classList.toggle("ac");
                displayInfo(i);
            }
            favDisplay.appendChild(cd);
        });
    }
}
home1.onclick=()=>{
    hero.classList.add("hidden");
    // alert("Welcome to the Food App! Please enter a dish name to get started.");
    canvas1.classList.remove("hidden");
    canvas2.classList.add("hidden");
    canvas3.classList.add("hidden");
}
catalog1.onclick=()=>{
    hero.classList.add("hidden");
    canvas1.classList.add("hidden");
    canvas2.classList.remove("hidden");
    canvas3.classList.add("hidden");
}
catalog2.onclick=()=>{
    hero.classList.add("hidden");
    canvas1.classList.add("hidden");
    canvas2.classList.remove("hidden");
    canvas3.classList.add("hidden");
}
fav1.onclick=()=>{
    hero.classList.add("hidden");
    canvas1.classList.add("hidden");
    canvas2.classList.add("hidden");
    canvas3.classList.remove("hidden");
    favDisplay.innerHTML="";
    if(container.length===0){
        err.classList.remove("hidden");
    }
    else{
        err.classList.add("hidden");
        container.forEach((i, index) => {
            const cd=document.createElement("div");
            cd.setAttribute('data-aos', 'fade-up');
            cd.setAttribute('data-aos-delay', `${index * 100}`);
            cd.innerHTML=`
            <img data-aos="fade-down" data-aos-duration="1000" src="${i.strMealThumb}" alt="">
            <h2>${i.strMeal}</h2>
            `;
            cd.onclick=()=>{
                details.classList.toggle("ac");
                displayInfo(i);
            }
            favDisplay.appendChild(cd);
        });
    }
}

const fetchSelectInfo=async (e)=>{
    try{
        const a=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${e}`);
        const data=await a.json();
        console.log(data);
        displayInfo(data.meals[0]);
    }catch(err){
        console.log(err);
        alert("Sorry, we couldn't fetch the categories")
    }
}  
const addDishesChild=(data)=>{
    data.meals.forEach((i, index) => {
        const cd=document.createElement("div");
        cd.setAttribute('data-aos', 'fade-up');
        cd.setAttribute('data-aos-delay', `${index * 100}`);
        cd.innerHTML=`
        <img data-aos="fade-down" data-aos-duration="100" src="${i.strMealThumb}" alt="">
        <h2>${i.strMeal}</h2>
        `;
        cd.onclick=()=>{
            details.classList.toggle("ac");
            (fetchSelectInfo(i.strMeal));
        }
        addDishesSelect.appendChild(cd);
    });
};
const fetchSelectData=async (e)=>{
    try{
        addDishesSelect.innerHTML="";
        const a=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${e}`);
        const data=await a.json();
        console.log(data);
        spinnerSelect.classList.toggle("hidden");
        addDishesChild(data);


    }catch(err){
        console.log(err);
        alert("Sorry, we couldn't fetch the categories")
        spinnerSelect.classList.toggle("hidden");
        spinnerSelect.classList.toggle("hidden");
    }
}
formSelect.onsubmit=(e)=>{
    spinnerSelect.classList.toggle("hidden");
    e.preventDefault();
    const dishSelect=cat.value;
    // alert(dishSelect);
    fetchSelectData(dishSelect);
    // fetchData(dish);
    
}
const getarr=async()=>{
    try{
        const a=await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
        const data=await a.json();
        console.log(data,cat);
        // alert("data fetched successfully")
        data.categories.forEach(i => {
            const cd=document.createElement("option");
            cd.value=i.strCategory;
            cd.textContent=i.strCategory;
            cat.appendChild(cd);


    })}
    catch(err){
        console.log(err);
        alert("Sorry, we couldn't fetch the categories")
    }
}
window.onload=()=>{
    
    const a=getarr();

};
csbtn.onclick=()=>{
    details.classList.toggle("ac");
}
let options={
    method:"GET",
    headers:{
        "Accept":"application/json",
        "Content-Type":"application/json",
        Authorization:"Bearer"
    }
    
}
function getUrl(youtubeUrl) {
    try {
      const parsedUrl = new URL(youtubeUrl);
  
      // Case 1: Standard URL with ?v=VIDEO_ID
      const videoId = parsedUrl.searchParams.get("v");
      if (videoId) return videoId;
  
      // Case 2: Shortened youtu.be links
      if (parsedUrl.hostname === "youtu.be") {
        return parsedUrl.pathname.slice(1);
      }
  
      // Case 3: Embed URLs
      if (parsedUrl.pathname.includes("/embed/")) {
        return parsedUrl.pathname.split("/embed/")[1];
      }
  
      return null; // If not found
    } catch (err) {
      console.error("Oops! Invalid YouTube URL:", err);
      return null;
    }
  }
  
const displayInfo=(data)=>{
    dp.innerHTML=``;
    let url=getUrl(data.strYoutube);
    dp.innerHTML=`
    <button id="add" class="bg-yellow-500 w-[30%] ml-auto h-[50px] block rounded-xl font-bold">Add to favorites</button>
     <div class="image  border-2 m-auto aspect-4/3 md:aspect-16/9 lg:aspect-[2/1]">
        <img class="m-auto" src="${data.strMealThumb}" alt="">
     </div>
            <div class="flex justify-between m-auto" >
                <div class="border-2 w-[49%]">${data.strMeal}</div>
                <div class="border-2 w-[50%] text-right">${data.strCategory}</div>
            </div>
            <div class="border-2  m-auto">
                ${data.strInstructions}
            </div>
            <div class="border-2">
                ${url ? `<iframe class="w-full aspect-video rounded-lg shadow-lg" src="https://www.youtube.com/embed/${url}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>` : 'No video available'}
            </div>
            <div class="border-2 m-auto">
                <h2>Ingredients</h2>
                <ul class="list-disc list-inside">
                    <li>${data.strIngredient1} : ${data.strMeasure1}</li>
                    <li>${data.strIngredient2} : ${data.strMeasure2}</li>
                    <li>${data.strIngredient3} : ${data.strMeasure3}</li>
                    <li>${data.strIngredient4} : ${data.strMeasure4}</li>
                    <li>${data.strIngredient5} : ${data.strMeasure5}</li>
                    <li>${data.strIngredient6} : ${data.strMeasure6}</li>
                    <li>${data.strIngredient7} : ${data.strMeasure7}</li>
                    <li>${data.strIngredient8} : ${data.strMeasure8}</li>
                </ul>
            </div>
        
            
    `;
    const addbtn=document.querySelector("#add");
    addbtn.onclick=()=>{
        // alert("Added to favorites");
        addfav(data);
    }

    
    
};

const addsDish=(data)=>{
    data.meals.forEach((i, index) => {
        const cd=document.createElement("div");
        cd.setAttribute('data-aos', 'fade-up');
        cd.setAttribute('data-aos-delay', `${index * 100}`);
        cd.innerHTML=`
        <img src="${i.strMealThumb}" alt="">
        <h2>${i.strMeal}</h2>
        `;
        cd.onclick=()=>{
            details.classList.toggle("ac");
            displayInfo(i);
        }
        addDishes.appendChild(cd);
    });
};
const fetchData=async (e)=>{
    try{
       
    ui.value=e;
    
    a=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${e}`);
    const data=await a.json();
    console.log(data);
    spinner.classList.toggle("hidden");
    addsDish(data)
   }catch(err){
    console.log(err);
    // spinner.classList.clear("hidden");
    
    await alert("Sorry, we couldn't find the dish you are looking for")

    
    await spinner.classList.toggle("hidden");
    spinner.classList.toggle("hidden");
   }
    

}


form.addEventListener("submit",function(e){
    
    spinner.classList.toggle("hidden");
    e.preventDefault();
    addDishes.innerHTML="";
    const dish=ui.value;
    fetchData(dish);

    ui.value="";


});
