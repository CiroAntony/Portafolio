const form = document.getElementById('form');
const btn = document.getElementById('send-button');
const email = document.getElementById("email_id");
const subject = document.getElementById("subject");
const message = document.getElementById("message");

(function() {

  var SkillsBar = function(bars) {
    this.bars = document.querySelectorAll(bars);
    if (this.bars.length > 0) {
      this.init();
    }
  };

  SkillsBar.prototype = {
    init: function() {
      var self = this;
      self.index = -1;
      self.timer = setTimeout(function() {
        self.action();
      }, 500);


    },
    select: function(n) {
      var self = this,
        bar = self.bars[n];

      if (bar) {
        var width = bar.parentNode.dataset.percent;

        bar.style.width = width;
        bar.parentNode.classList.add("complete");
      }
    },
    action: function() {
      var self = this;
      self.index++;
      if (self.index == self.bars.length) {
        clearTimeout(self.timer);
      } else {
        self.select(self.index);
      }

      setTimeout(function() {
        self.action();
      }, 500);
    }
  };

  window.SkillsBar = SkillsBar;

})();

(function() {
  document.addEventListener("DOMContentLoaded", function() {
    var skills = new SkillsBar(".skillbar-bar");
  });
})();




const validateForm = () => {
  form.addEventListener('submit', function(event) {
    event.preventDefault();

    if (email.value === "" || subject.value === "" || message.value === "") {
      alert("Por favor llene todos los campos");
      return;
    }

    btn.value = 'Sending...';

    const serviceID = 'default_service';
    const templateID = 'template_2ceopz8';

    emailjs.sendForm(serviceID, templateID, this)
      .then(() => {
        btn.value = 'Send Email';
        alert('Sent!');
        email.value = "";
        subject.value = "";
        message.value = "";
      }, (err) => {
        btn.value = 'Send Email';
        alert(JSON.stringify(err));
      });
  });
}

validateForm();



