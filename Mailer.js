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

  var body = 'Way back around the beginning of March, a few people from our HR cohort filled out these anonymous forms about each other: \n' +
    '\n' +
    'REDACTED \n' +
    '\n' +
    'The original idea was to make it easier to fill out our profiles on AngelList. Apologies for following up on this waaaay too late— oops!\n' +
    'In any case, I thought you might still be interested in seeing your results... (anonymized and randomized)\n' +
    '\n' +
    '=========================================================\n' +
    '\n' +
    feedback + '\n' +
    '\n' +
    '=========================================================\n' +
    '\n' +
    'Love ya, and all the best!\n' +
    '\n' +
    'David';

  GmailApp.sendEmail(to, 'HR23 Collaborative Bios', body, {from: 'REDACTED'})
}

function sendToAll() {
  for (name in contacts) {
    sendFeedback(name);
  }
}
