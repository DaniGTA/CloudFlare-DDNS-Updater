﻿/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2014-2015 Anthony Birkett
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceProcess;
using CloudFlareDDNS.Classes.JsonObjects.Cloudflare;

namespace CloudFlareDDNS
{
    /// <summary>
    /// Run the update process as a Windows Service
    /// </summary>
    public partial class Service : ServiceBase
    {
        /// <summary>
        /// Used for auto updating
        /// </summary>
        private System.Timers.Timer autoUpdateTimer = null;

        /// <summary>
        /// Constructor
        /// </summary>
        public Service()
        {
            this.CanPauseAndContinue = true;
            this.ServiceName = "CloudFlareDDNS";
        }//end Service()

        /// <summary>
        /// Service startup
        /// </summary>
        /// <param name="args"></param>
        protected override void OnStart(string[] args)
        {
            autoUpdateTimer = new System.Timers.Timer(Program.settingsManager.getSetting("FetchTime").ToInt() * 60000); //Minutes to milliseconds
            autoUpdateTimer.Elapsed += autoUpdateTimer_Tick;
            autoUpdateTimer.Enabled = true;

            Logger.log(Properties.Resources.Logger_Start + " " + Program.settingsManager.getSetting("FetchTime").ToString() + " " + Properties.Resources.Logger_Interval + " " + Program.settingsManager.getSetting("Domain").ToString(), Logger.Level.Info);
        }//end OnStart()

        /// <summary>
        /// Service stop
        /// </summary>
        protected override void OnStop()
        {
            autoUpdateTimer.Enabled = false;
            Logger.log(Properties.Resources.Logger_ServiceStop, Logger.Level.Info);
        }//end OnStop()

        /// <summary>
        /// Pause the service
        /// </summary>
        protected override void OnPause()
        {
            autoUpdateTimer.Enabled = false;
        }//end OnPause()

        /// <summary>
        /// Resume the service
        /// </summary>
        protected override void OnContinue()
        {
            autoUpdateTimer.Enabled = true;
        }//end OnContinue()

        /// <summary>
        /// Auto update every x minutes, creates a new timerUpdateThread() thread
        /// NOTE: This already runs in its own thread!
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void autoUpdateTimer_Tick(object sender, EventArgs e)
        {
            Program.settingsManager.loadSettings(); //Do this to reload the config, GUI might have changed settings since last tick
            autoUpdateTimer.Interval = (Program.settingsManager.getSetting("FetchTime").ToInt() * 60000); //Minutes to milliseconds
            Program.cloudFlareAPI.getExternalAddress();
            if (!string.IsNullOrEmpty(Program.settingsManager.getSetting("SelectedZones").ToString()))
            {
                List<Result> resultList = new List<Result>();
                foreach (string SelectedZones in Program.settingsManager.getSetting("SelectedZones").ToString().Split(';'))
                {

                    GetDnsRecordsResponse records = Program.cloudFlareAPI.getCloudFlareRecords(SelectedZones);
                    records.result.All(x => { resultList.Add(x); return true; });
                }
                if (resultList != null)
                {
                    Program.cloudFlareAPI.updateRecords(null, resultList);
                }
            }
        }//end autoUpdateTimer_Tick()
    }//end class
}//end namespace