import type { NextConfig } from "next";
import ModuleDir2NamespacePlugin from "./webpack/plugins/module-dir-2-namespace";
import path from "path";

const nextConfig: NextConfig = {
    webpack (config,){
        config.plugins.push(
            new ModuleDir2NamespacePlugin({
                fromDir: path.resolve(__dirname,'src/services'),
                outputFile: path.resolve(__dirname, '.runtime', 'services.ts'),
            })
        );
        return config;
    },
};

export default nextConfig;
