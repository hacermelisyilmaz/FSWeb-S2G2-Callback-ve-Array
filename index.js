const { fifaData } = require("./fifa.js");

/* Görev 1: 
	Verilen datayı parçalayarak aşağıdaki verileri (console.log-ing) elde ederek pratik yapın. 
	
	💡 İPUCU: Öncelikle datayı filtrelemek isteyebilirsiniz */

//(a) 2014 Dünya kupası Finali Evsahibi takım ismi (dizide "Home Team Name" anahtarı)

const isFinalIn2014 = (match) =>
  match["Year"] === 2014 && match["Stage"] === "Final";
const finalIn2014Array = fifaData.filter(isFinalIn2014);
const finalIn2014 = finalIn2014Array[0];
//console.log("2014 Dünya Kupası Finali: ", finalIn2014);

console.log(
  "2014 Dünya Kupası Finali ev sahibi takım ismi: ",
  finalIn2014["Home Team Name"]
);

//(b) 2014 Dünya kupası Finali Deplasman takım ismi  (dizide "Away Team Name" anahtarı)

console.log(
  "2014 Dünya Kupası Finali deplasman takım ismi: ",
  finalIn2014["Away Team Name"]
);

//(c) 2014 Dünya kupası finali Ev sahibi takım golleri (dizide "Home Team Goals" anahtarı)

console.log(
  "2014 Dünya Kupası Finali ev sahibi takım golleri: ",
  finalIn2014["Home Team Goals"]
);

//(d)2014 Dünya kupası finali Deplasman takım golleri  (dizide "Away Team Goals" anahtarı)

console.log(
  "2014 Dünya Kupası Finali deplasman takım golleri: ",
  finalIn2014["Away Team Goals"]
);

//(e) 2014 Dünya kupası finali kazananı*/
const winnerTeam = () => {
  if (finalIn2014["Home Team Goals"] > finalIn2014["Away Team Goals"]) {
    return finalIn2014["Home Team Name"];
  } else {
    return finalIn2014["Away Team Name"];
  }
};

console.log("2014 Dünya Kupası Finali kazananı: ", winnerTeam());

/*  Görev 2: 
	Finaller adlı fonksiyonu kullanarak aşağıdakileri uygulayın:
	1. Bir dizi(array) olan Fifa datasını fonksiyonun birinci parametresi olarak alacak
	2. Sadece final maçlarını içeren nesnenin(object) datalarını filtreleyerek, bir dizi olarak döndürecek(return)
	
	💡 İPUCU - verilen data içindeki nesnelerin(objects) "Stage" anahtarına bakmalısınız
*/

function Finaller(aFifaData) {
  const isFinal = (match) => match["Stage"] === "Final";
  return aFifaData.filter(isFinal);
}

/*  Görev 3: 
	Bir higher-order fonksiyonu olan Yillar isimli fonksiyona aşağıdakileri uygulayın: 
	1. fifaData dizisini(array) fonksiyonun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Finaller data setindeki tüm yılları içeren "years" adındaki diziyi(array) döndürecek
	*/

function Yillar(aFifaData, aFinaller) {
  const finals = aFinaller(aFifaData);
  const mapYear = (match) => match["Year"];
  const years = finals.map(mapYear);
  return years;
}

/*  Görev 4: 
	Bir higher-order fonksiyonunu olan Kazananlar isimli fonksiyona aşağıdakileri uygulayın:  
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Her final maçının kazananını (evsahibi ya da deplasman) belirleyecek
	💡 İPUCU: Beraberlikler(ties) için şimdilik endişelenmeyin (Detaylı bilgi için README dosyasına bakabilirsiniz.)
	4. Tüm kazanan ülkelerin isimlerini içeren `kazananlar` adında bir dizi(array) döndürecek(return)  */

function Kazananlar(aFifaData, aFinaller) {
  const finals = aFinaller(aFifaData);
  const winners = [];
  const Winner = (match) => {
    if (match["Home Team Goals"] > match["Away Team Goals"]) {
      winners.push(match["Home Team Name"]);
    } else {
      winners.push(match["Away Team Name"]);
    }
  };
  finals.forEach(Winner);
  return winners;
}

/*  Görev 5: 
	Bir higher-order fonksiyonu olan YillaraGoreKazananlar isimli fonksiyona aşağıdakileri uygulayın:
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Görev 3'de yazdığınız Yillar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun üçüncü parametresi olarak alacak
	4. Görev 4'de yazdığınız Kazananlar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun dördüncü parametresi olarak alacak
	5. Her yıl için "{yıl} yılında, {ülke} dünya kupasını kazandı!" cümlesini(string) içeren bir diziyi(array) döndürecek
	
	💡 İPUCU: her cümlenin adım 4'te belirtilen cümleyle birebir aynı olması gerekmektedir.
*/

function YillaraGoreKazananlar(aFifaData, aFinaller, aYillar, aKazananlar) {
  const years = aYillar(aFifaData, aFinaller);
  const winners = aKazananlar(aFifaData, aFinaller);
  const winnersInYears = [];
  for (let i = 0; i < years.length; i++) {
    winnersInYears.push(
      `${years[i]} yılında, ${winners[i]} dünya kupasını kazandı!`
    );
  }
  return winnersInYears;
}

/*  Görev 6: 
	Bir higher order fonksiyonu olan `OrtalamaGolSayisi` isimli fonksiyona aşağıdakileri uygulayın: 
	1. Görev 2'de yazdığınız `Finaller` fonksiyonunu birinci parametre olarak alacak; 'fifaData' dizisini argüman olarak eklediğinizden emin olun
	
	💡 İPUCU: Çağırma örneği: `OrtalamaGolSayisi(Finaller(fifaData));`
	
	2. Her maç için Ortalama toplam evsahibi gol sayısı ve toplam deplasman gol sayısını hesaplayacak (her maçta atılan toplam gol sayısı)
	
	3. Sonucun 2. ondalığını yuvarlayıp, bulunan değeri döndürecek(return)
	
	💡 İPUCU: .reduce, .toFixed (dizilim(syntax) için MDN'ye bakın) kullan, ve bunu 2 adımda yapın) 
	
*/

function OrtalamaGolSayisi(aFinaller) {
  const totalGoals = aFinaller.reduce((total, match) => {
    return total + match["Home Team Goals"] + match["Away Team Goals"];
  }, 0);
  const avg = totalGoals / aFinaller.length;
  return avg.toFixed(2);
}

OrtalamaGolSayisi(Finaller(fifaData));

/// EKSTRA ÇALIŞMALAR ///

/*  BONUS 1:  
	`UlkelerinKazanmaSayilari` isminde bir fonksiyon oluşturun, parametre olarak `data` ve `takım kısaltmalarını` 
	alacak ve hangi ülkenin kaç dünya kupası olduğunu döndürecek
	
	İpucu: "takım kısaltmaları" (team initials) için datada araştırma yapın!
	İpucu: `.reduce` Kullanın*/

function UlkelerinKazanmaSayilari(aFifaData, aInitial) {
  return aFifaData.reduce((cup, match) => {
    if (
      match["Home Team Goals"] > match["Away Team Goals"] &&
      match["Home Team Goals"] === aInitial
    ) {
      return cup + 1;
    }
    if (
      match["Home Team Goals"] < match["Away Team Goals"] &&
      match["Away Team Goals"] === aInitial
    ) {
      return cup + 1;
    }
  }, 0);
}

console.log(UlkelerinKazanmaSayilari(fifaData, "FRA"));

/*  BONUS 2:  
EnCokGolAtan() isminde bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupası finallerinde en çok gol atan takımı döndürsün */

function EnCokGolAtan(/* kodlar buraya */) {
  /* kodlar buraya */
}

/*  BONUS 3: 
EnKotuDefans() adında bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupasında finallerinde en çok golü yiyen takımı döndürsün*/

function EnKotuDefans(/* kodlar buraya */) {
  /* kodlar buraya */
}

/* Hala vaktiniz varsa, README dosyasında listelenen hedeflerden istediğinizi aşağıdaki boşluğa yazabilirsiniz. */

/* Bu satırın aşağısındaki kodları lütfen değiştirmeyin */
function sa() {
  console.log("Kodlar çalışıyor");
  return "as";
}
sa();
module.exports = {
  sa,
  Finaller,
  Yillar,
  Kazananlar,
  YillaraGoreKazananlar,
  OrtalamaGolSayisi,
};
