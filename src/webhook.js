({ http_event }) => {
  const parsed_body = http_event.parsed_body;
  const workspaceId = parsed_body.team_id;
  const userId = parsed_body.user_id;

  setImmediate(() => {
    let user = api.user({type: "slack", workspaceId, userId});
    let message = api.run('this.get_slack_message', {user})[0];
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