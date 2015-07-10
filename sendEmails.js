/*global Session, GmailApp, contacts, responses*/

// Log the aliases for this Gmail account.
var me = Session.getActiveUser().getEmail();
var aliases = GmailApp.getAliases();

function sendFeedback(name) {
  name = name || 'David Ernst';

  // grab the email address for that name
  var to = contacts[name];

  // grab the feedback array for that name
  var feedback = responses[name];
  feedback = '- ' + feedback.join('\n- ');

  var body = ['Way back around the beginning of March, a few people from our HR cohort filled out these anonymous forms about each other:',
    '',
    'REDACTED ',
    '',
    'The idea was to make it easier to fill out our profiles on AngelList. To crowdsource our bio\'s, instead of writing about ourselves. Here are your results, anonymized and randomized',
    '',
    '=========================================================',
    '',
    feedback,
    '',
    '=========================================================',
    '',
    'Love ya, and all the best!',
    '',
    'David'].join('\n');

  GmailApp.sendEmail(to, 'HR23 Collaborative Bios', body, {from: 'REDACTED'});
}

function sendToAll() {
  for (var name in contacts) {
    sendFeedback(name);
  }
}
