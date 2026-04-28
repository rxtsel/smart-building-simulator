{
  description = "Devtools for Smart Building Simulator";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = {
    nixpkgs,
    flake-utils,
    ...
  }:
    flake-utils.lib.eachDefaultSystem (
      system: let
        pkgs = import nixpkgs {
          inherit system;
          config.allowUnfree = true;
        };

        tmole = pkgs.writeShellApplication {
          name = "tmole";
          runtimeInputs = [pkgs.nodejs];
          text = ''
            exec npm exec --yes --package=tunnelmole@latest -- tmole "$@"
          '';
        };
      in {
        devShells.default = pkgs.mkShell {
          packages = with pkgs; [
            nodejs_25
            pnpm
            tmole
          ];
        };
      }
    );
}
