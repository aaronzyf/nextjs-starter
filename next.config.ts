import type { NextConfig } from "next";
import ModuleDirIndexPlugin from "./webpack/plugins/module-dir-index";
import path from "path";

const nextConfig: NextConfig = {
    webpack (config,){
        config.plugins.push(
            new ModuleDirIndexPlugin({
                fromDir: path.resolve(__dirname,'src/services'),
                outputFile: path.resolve(__dirname, '.runtime', 'services.ts'),
            })
        );
        return config;
    },
};

export default nextConfig;
