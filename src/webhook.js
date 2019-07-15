({ http_event }) => {
  let {user_id, team_id, response_url} = http_event.parsed_body;
  setImmediate(() => {
    let user = `${team_id}:${user_id}`;
    let message = api.run('this.get_slack_message', {user})[0];
    console.log(message);
    api.run("slack_webhook.post_to_response_url", {
      response_url: response_url,
      post_body: message
    });
  });
  return { status_code: 200 };
}

/*
 * For sample code and reference material, visit
 * https://www.transposit.com/docs/building/webhooks
 */