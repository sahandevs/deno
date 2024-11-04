// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.

let i = 0;

Deno.serve((_req) => {
  using _span = new Deno.tracing.Span("request", "server");
  // deno-lint-ignore no-console
  console.log("got req", i++);
  return new Response(null, { status: 200 });
});
