// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.

import { assertEquals } from "jsr:@std/assert";

const ac = new AbortController();

Deno.serve(
  {
    signal: ac.signal,
    port: 4318,
    onListen() {},
    handler: async (req) => {
      const body = await req.json();
      assertEquals(
        body.resourceLogs[0].scopeLogs[0].logRecords[0].body.stringValue,
        "hi!\n",
      );
      setTimeout(() => ac.abort(), 50);
      return new Response(null, { status: 200 });
    },
  },
);

// deno-lint-ignore no-console
console.log("hi!");
