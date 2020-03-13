declare namespace WoTHelpers {
  function fetch(uri: string): Promise<WoT.ThingDescription>;
  function register(directory: string, thing: WoT.ExposedThing): Promise<void>;
}
