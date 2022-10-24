


window.addEventListener('DOMContentLoaded', setup);


function setup() {

  document.getElementById("initialise_list").addEventListener("click", initialise_list);
  document.getElementById("initialise_all").addEventListener("click", initialise_all);

}


function initialise_all() {
  const idlist = [];
  initialise(idlist);
}

function initialise_list() {
  var idlist = document.getElementById('idlist').value.split(',');
  initialise(idlist);
}



function initialise(idlist) {



  const version = document.getElementById('version').value;
  const field = document.getElementById('field').value;
  const subcat = document.getElementById('subcat').value;

  cat = "CEERS_NIRCam"+field+"_v"+version+subcat;
  vf = version+"_"+field

  var x,xmlhttp,xmlDoc
  xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", "cats/"+cat+".xml", false);
  xmlhttp.send();
  xmlDoc = xmlhttp.responseXML;
  x = xmlDoc.getElementsByTagName("row");

  if (idlist.length == 0) {
    idlist = Array.from({length: x.length}, (x, i) => i+1);
  }

  console.log(idlist);


  function precise(y, p) {
    return y.toPrecision(p);
  }

  table = ""

  idlist.forEach(function (item, index) {

    i = item - 1;



    table += "<tr>";

    // info table

    table += "<td><table>";

    id = x[i].getElementsByTagName("photom-ID")[0].childNodes[0].nodeValue;
    table += "<tr><td>ID</td><td>" + id + "</td></tr>";

    const infoarray = ["X", "Y", "RA", "DEC"]
    infoarray.forEach(function (item, index) {
      val = x[i].getElementsByTagName("photom-"+item)[0].childNodes[0].nodeValue;
      table += "<tr><td>" + item + "</td><td>" + precise(parseFloat(val), 4) + "</td></tr>";
    });


    ra = x[i].getElementsByTagName('photom-RA')[0].childNodes[0].nodeValue;
    dec = x[i].getElementsByTagName('photom-DEC')[0].childNodes[0].nodeValue;
    href = "https://ned.ipac.caltech.edu/conesearch?in_csys=Equatorial&in_equinox=J2000&coordinates="+precise(parseFloat(ra),6)+"d%20%2B"+precise(parseFloat(dec),6)+"d&radius=0.02&hconst=67.8&omegam=0.308&omegav=0.692&wmap=4&corr_z=1&z_constraint=Unconstrained&z_unit=z&ot_include=ANY&nmp_op=ANY&search_type=Near%20Position%20Search&out_csys=Same%20as%20Input&out_equinox=Same%20as%20Input&obj_sort=Distance%20to%20search%20center"

    table += '<tr><td><a href="' + href + '">NED</a></td><td>'



    table += "</table></td>";


    // JWST photom table

    table += "<td><b>JWST Photometry</b><br><table>";




    const photomarray = ["115", "150", "200", "277", "356", "410", "444"]
    photomarray.forEach(function (item, index) {
      try {
      table += "<tr><td>" + item + "</td>";
      flux = x[i].getElementsByTagName("photom-F"+item)[0].childNodes[0].nodeValue
      err = x[i].getElementsByTagName("photom-DF"+item)[0].childNodes[0].nodeValue
      table += "<td>" + precise(parseFloat(flux), 4) + "</td>";
      table += "<td>" + precise(parseFloat(err), 4) + "</td>";
      table += "<td>" + precise(flux/err, 4) + "</td>";
      table += "</tr>";
      }
      catch {
        console.log(item);
      }
    });

    table += "</table></td>";

    // HST photom table

    table += "<td><b>HST Photometry</b><br><table>";

    const HSTphotomarray = ["606", "814", "105", "125", "140", "160"]
    HSTphotomarray.forEach(function (item, index) {
      try {
      table += "<tr><td>" + item + "</td>";
      flux = x[i].getElementsByTagName("photom-F"+item)[0].childNodes[0].nodeValue
      err = x[i].getElementsByTagName("photom-DF"+item)[0].childNodes[0].nodeValue
      table += "<td>" + precise(parseFloat(flux), 4) + "</td>";
      table += "<td>" + precise(parseFloat(err), 4) + "</td>";
      table += "<td>" + precise(flux/err, 4) + "</td>";
      table += "</tr>";
      }
      catch {
        console.log(item);
      }
    });

    table += "</table></td>";

    table += "<td><img style='width:350px;' src='cats/"+cat+"/sed_"+id+".png'></td>";
    table += "<td><b>Redshifts</b><br><table>";

    const zarray = ['ZA', 'CHIA', 'CHI2_LOW', 'ZLOW', 'CHI2_HI', 'ZHI']
    zarray.forEach(function (item, index) {
      try {
      table += "<tr><td>" + item + "</td>";
      v = x[i].getElementsByTagName("pz-ceers-"+item)[0].childNodes[0].nodeValue
      table += "<td>" + precise(parseFloat(v), 3) + "</td>";
      table += "</tr>";
      }
      catch {
        console.log(item);
      }
    });

    table += "</table></td>";
    table += "<td><img style='width:350px;' src='cats/"+cat+"/pz_"+id+".png'></td>";
    table += "<td><img style='width:250px;' src='cats/"+cat+"/wide_significance_"+id+".png'></td>";
    table += "<td><img style='width:250px;' src='cats/"+cat+"/significance_"+id+".png'></td>";
    table += "<td><img style='height:250px;' src='cats/"+cat+"/cutout_"+id+".png'></td>";
    table += "</tr>";
  });


  document.getElementById("table").innerHTML = table;
}
