FROM ubuntu:20.04

# 1. Create user up front
RUN useradd -ms /bin/bash sandbox

# 2. Combine all apt installs into a single layer to leverage cache and maintain size
# avoiding `apt upgrade` is a best-practice; rely on the base image instead
RUN apt-get update && \
    apt-get install -y curl nano && \
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs && \
    rm -rf /var/lib/apt/lists/*

# 3. Create directories and immediately give `sandbox` user ownership
RUN mkdir -p /home/sandbox/projects /home/sandbox/app && \
    chown -R sandbox:sandbox /home/sandbox

# 4. Modify .bashrc (chown makes sure it's owned by sandbox)
RUN echo 'PS1="[\u@\h \W]\$ "' >> /home/sandbox/.bashrc && \
    chown sandbox:sandbox /home/sandbox/.bashrc

# 5. Set the active user to sandbox going forward
USER sandbox

WORKDIR /home/sandbox/app

# Default command
CMD ["bash"]
