  // Your web app's Firebase configuration
  var firebaseConfig = {
      apiKey: "AIzaSyDPNO8tVVAr2g91QXy5mGbtdoqGe9inoHc",
      authDomain: "ipc-cw.firebaseapp.com",
      databaseURL: "https://ipc-cw.firebaseio.com",
      projectId: "ipc-cw",
      storageBucket: "ipc-cw.appspot.com",
      messagingSenderId: "181723082950",
      appId: "1:181723082950:web:0c7b1527f10b55dfafa7c7"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  var database = firebase.database();

  var starCountRef = firebase.database().ref('deviceData/' + 389);
  starCountRef.on('value', function (snapshot) {
      let deviceData = snapshot.val()
      const {
          bpm,
          snore
      } = deviceData;

     

      let arr = Object.keys(snore);

      let min = Math.min(...arr);
      let max = Math.max(...arr);

      let arrbpm = Object.keys(bpm);

      let minbpm = Math.min(...arrbpm);

      let maxbpm = Math.max(...arrbpm);


      var theDateBpm = new Date(maxbpm * 1000);

      let dateTimeBpm = theDateBpm.toGMTString();


      var theDateSnore = new Date(max * 1000);

      let dateTimeSnore = theDateSnore.toGMTString();


      $('#bpm-date').text(dateTimeBpm);
      let bpmStatus = bpm[maxbpm] > 90 ? 'BPM is abnormal please breath.' : 'BPM is normal. Take good sleep.'

      $('#bpm').text(bpm[maxbpm] + " BPM | " + bpmStatus);

      $('#bpm-val').text(bpm[maxbpm])


      $('#snore-date').text(dateTimeSnore);


      var historyBpmDomHtml = '';

      arrbpm.forEach((time) => {
          
          var date = new Date(time * 1000);

          let timeBpm = date.toGMTString();

          historyBpmDomHtml += `<h3>Read Time | ${timeBpm}<h3> <h3>Status | ${bpm[time] > 90 ? 'Critical' :'Normal'}<h3> <hr/>`
      });
      $('#bpm-history').html(historyBpmDomHtml);
      var historyDomHtml = '';

      arr.forEach((time) => {
          var date = new Date(time * 1000);

          let timeSnore = date.toGMTString();

          historyDomHtml += `<h3>Read Time | ${timeSnore}<h3> <h3>Status | ${snore[time] ? 'SNORED' :'NOT SNORED'}<h3> <hr/>`
      });

      $('#snore-history').html(historyDomHtml);
      $('#snore').text(snore[max] ? 'Snore Detected' : 'Snore Not Detected');
      // updateStarCount(postElement, snapshot.val());
  });