/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShieldCheck, Landmark, PhoneCall } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-10 px-4 lg:px-8 border-t-4 border-gzred mt-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 text-left">
        
        {/* Left Side: Brand & address details */}
        <div className="md:col-span-5 space-y-4">
          <div className="flex items-center gap-2">
            <Landmark className="w-5 h-5 text-gzgold" />
            <span className="text-[14px] font-bold tracking-widest text-white">广州银行股份有限公司</span>
          </div>
          <p className="text-[11.5px] leading-relaxed text-slate-400">
            总部地址：中国广东省广州市天河区珠江新城珠江东路30号广州银行大厦 <br />
            电话热线：+86 (020) 96699 (行内一键内线直拨：Ext. 8000) <br />
            官方统一门户，严禁将其中的通知文件、涉密工作汇报和客户分录通过外部软盘、社群转发扩散。
          </p>
        </div>

        {/* Middle Columns: Links */}
        <div className="md:col-span-4 grid grid-cols-2 gap-4">
          <div>
            <h4 className="text-[11.5px] font-bold text-white uppercase tracking-wider mb-3">安全链接</h4>
            <ul className="space-y-2 text-[10.5px]">
              <li><a href="#rules" className="hover:text-gzgold transition-colors">行员文明禁令条例</a></li>
              <li><a href="#audit" className="hover:text-gzgold transition-colors">全流程反洗钱审查库</a></li>
              <li><a href="#logs" className="hover:text-gzgold transition-colors">行内涉密操作安全审计</a></li>
              <li><a href="#u-shield" className="hover:text-gzgold transition-colors">金钥匙U盾驱动升级端</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[11.5px] font-bold text-white uppercase tracking-wider mb-3">研发运维</h4>
            <ul className="space-y-2 text-[10.5px]">
              <li><span className="text-slate-400 select-none">总行信息技术部开发三科</span></li>
              <li><span className="text-slate-400 select-none">信息技术条线联合调试中心</span></li>
              <li><span className="text-slate-400 select-none">安全保障组应急支持热线</span></li>
              <li><span className="text-slate-400 select-none">系统版本: GZ-PORTAL v4.21.0</span></li>
            </ul>
          </div>
        </div>

        {/* Right Side: Certification & Badges */}
        <div className="md:col-span-3 flex flex-col justify-between items-start md:items-end gap-4">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-[10.5px] text-gzgold select-none">
            <ShieldCheck className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
            <span>三级等保安全沙箱认证</span>
          </div>

          <p className="text-[10px] text-slate-500 text-left md:text-right font-sans leading-relaxed">
            粤公网安备 44010602005470号 <br />
            粤ICP备 05047805号 <br />
            © {new Date().getFullYear()} 广州银行股份有限公司. 版权所有.
          </p>
        </div>

      </div>

      {/* Decorative Minimalist Guangzhou Canton Tower vector indicator at bottom */}
      <div className="max-w-7xl mx-auto pt-6 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-500 mt-8">
        <span>此沙箱环境已由广州银行网络防火墙建立物理隔离屏障</span>
        <span className="font-mono">IP: 10.12.188.* | HOSTNAME: GZBB-PRD-NODE-03</span>
      </div>

    </footer>
  );
}
